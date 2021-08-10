import { Activity, Assignment, Quiz, Resource } from '.prisma/client';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { ActivityReturnType, QuizReturnType } from './activity.types';
import { CreateBaseActivityInput } from './dto/create-base-activity.input';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { UpdateBaseActivityInput } from './dto/update-base-activity.input';
import { ActivityUtilsService } from './services/activity-utils.service';
import { ResourceObject } from './dto/resource.object';
import { AssignmentObject } from './dto/assignment.object';

@Injectable()
export class ActivityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService,
		private readonly activityUtilsService: ActivityUtilsService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';
	private readonly INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

	private normalizeSpecificActivity<T extends Resource | Assignment | Quiz>(
		specificActivity: T
	): Omit<T, 'universityId' | 'activityId'> {
		const {
			universityId,
			activityId,
			...normalizedSpecificActivity
		} = specificActivity;

		return normalizedSpecificActivity;
	}

	private extractCreateActivityFields<
		TData extends
			| CreateResourceInput
			| CreateAssignmentInput
			| CreateQuizInput
	>(
		data: TData
	): {
		createBaseActivityFields: CreateBaseActivityInput;
		createSpecificActivityFields: Omit<
			TData,
			keyof CreateBaseActivityInput
		>;
	} {
		const {
			sectionId,
			name,
			description,
			...createSpecificActivityFields
		} = data;

		return {
			createBaseActivityFields: { sectionId, name, description },
			createSpecificActivityFields
		};
	}

	private extractUpdateActivityFields<
		TData extends
			| UpdateResourceInput
			| UpdateAssignmentInput
			| UpdateQuizInput
	>(
		data: TData
	): {
		updateBaseActivityFields: UpdateBaseActivityInput;
		updateSpecificActivityFields: Omit<
			TData,
			keyof UpdateBaseActivityInput
		>;
	} {
		const {
			sectionId,
			name,
			description,
			oldFiles,
			filesToDelete,
			...updateSpecificActivityFields
		} = data;

		return {
			updateBaseActivityFields: {
				sectionId,
				name,
				description,
				oldFiles,
				filesToDelete
			},
			updateSpecificActivityFields
		};
	}

	private async createActivityFiles(
		universityId: string,
		id: string,
		baseActivityFields: CreateBaseActivityInput,
		files: FileUpload[]
	): Promise<string[]> {
		const identificationExtraInfos = await this.prisma.section.findUnique({
			where: {
				id: baseActivityFields.sectionId
			},
			select: {
				course: {
					select: {
						id: true,
						college: {
							select: {
								id: true
							}
						}
					}
				}
			}
		});
		if (!identificationExtraInfos) {
			throw new Error(this.NOT_FOUND);
		}
		const createdFiles = await this.fileService.createBaseActivityFiles(
			{
				universityId,
				activityId: id,
				sectionId: baseActivityFields.sectionId,
				courseId: identificationExtraInfos.course.id,
				collegeId: identificationExtraInfos.course.college.id
			},
			files
		);

		return createdFiles;
	}

	private async createBaseActivity(
		universityId: string,
		type: ActivityType,
		baseActivityFields: CreateBaseActivityInput,
		files: FileUpload[]
	): Promise<Activity> {
		const baseActivity = await this.prisma.activity.create({
			data: {
				...baseActivityFields,
				universityId,
				type,
				files: []
			}
		});
		const createdFiles = await this.createActivityFiles(
			universityId,
			baseActivity.id,
			baseActivityFields,
			files
		);
		const baseActivityUpdated = await this.prisma.activity.update({
			where: {
				id: baseActivity.id
			},
			data: {
				files: createdFiles
			}
		});

		return baseActivityUpdated;
	}

	private async updateBaseActivity(
		universityId: string,
		id: string,
		{
			oldFiles,
			filesToDelete,
			...baseActivityFields
		}: UpdateBaseActivityInput,
		newFiles: FileUpload[]
	): Promise<Activity> {
		const updatedOldFiles = await this.activityUtilsService.deleteFiles(
			oldFiles,
			filesToDelete
		);
		const createdNewFiles = await this.createActivityFiles(
			universityId,
			id,
			baseActivityFields,
			newFiles
		);
		const baseActivity = await this.prisma.activity.update({
			where: {
				id_universityId: {
					id,
					universityId
				}
			},
			data: {
				...baseActivityFields,
				files: [...new Set([...updatedOldFiles, ...createdNewFiles])]
			}
		});

		return baseActivity;
	}

	async getActivity(
		universityId: string,
		id: string
	): Promise<ActivityReturnType> {
		try {
			const baseActivity = await this.prisma.activity.findUnique({
				where: {
					id_universityId: {
						id,
						universityId
					}
				}
			});
			if (!baseActivity) {
				throw new Error(this.NOT_FOUND);
			}

			const relatedActivity = {
				where: {
					activityId: baseActivity.id
				}
			};
			let specificActivity: Resource | Assignment | Quiz | null;
			switch (baseActivity.type) {
				case ActivityType.RESOURCE:
					specificActivity = await this.prisma.resource.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.ASSIGNMENT:
					specificActivity = await this.prisma.assignment.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.QUIZ:
				default:
					specificActivity = await this.prisma.quiz.findUnique(
						relatedActivity
					);
			}

			if (!specificActivity) {
				throw new Error(this.INTERNAL_SERVER_ERROR);
			}

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async createResource(
		universityId: string,
		data: CreateResourceInput,
		files: FileUpload[]
	): Promise<ResourceObject> {
		try {
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.extractCreateActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.RESOURCE,
				createBaseActivityFields,
				files
			);
			const specificActivity = await this.prisma.resource.create({
				data: {
					...createSpecificActivityFields,
					activityId: baseActivity.id,
					universityId
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async updateResource(
		universityId: string,
		id: string,
		data: UpdateResourceInput,
		newFiles: FileUpload[]
	): Promise<ResourceObject> {
		try {
			const {
				updateBaseActivityFields,
				updateSpecificActivityFields
			} = this.extractUpdateActivityFields(data);
			const baseActivity = await this.updateBaseActivity(
				universityId,
				id,
				updateBaseActivityFields,
				newFiles
			);
			const specificActivity = await this.prisma.resource.update({
				where: {
					activityId_universityId: {
						activityId: id,
						universityId
					}
				},
				data: updateSpecificActivityFields
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.code === 'P2025' || e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async createAssignment(
		universityId: string,
		data: CreateAssignmentInput,
		files: FileUpload[]
	): Promise<AssignmentObject> {
		try {
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.extractCreateActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.ASSIGNMENT,
				createBaseActivityFields,
				files
			);
			const specificActivity = await this.prisma.assignment.create({
				data: {
					...createSpecificActivityFields,
					activityId: baseActivity.id,
					universityId
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			console.log(e);
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async updateAssignment(
		universityId: string,
		id: string,
		data: UpdateAssignmentInput,
		newFiles: FileUpload[]
	): Promise<AssignmentObject> {
		try {
			const {
				updateBaseActivityFields,
				updateSpecificActivityFields
			} = this.extractUpdateActivityFields(data);
			const baseActivity = await this.updateBaseActivity(
				universityId,
				id,
				updateBaseActivityFields,
				newFiles
			);
			const specificActivity = await this.prisma.assignment.update({
				where: {
					activityId_universityId: {
						activityId: id,
						universityId
					}
				},
				data: updateSpecificActivityFields
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.code === 'P2025' || e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async createQuiz(
		universityId: string,
		data: CreateQuizInput,
		files: FileUpload[]
	): Promise<QuizReturnType> {
		try {
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.extractCreateActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.QUIZ,
				createBaseActivityFields,
				files
			);
			const {
				questions,
				...specificActivityFields
			} = createSpecificActivityFields;
			const specificActivity = await this.prisma.quiz.create({
				data: {
					...specificActivityFields,
					// TODO: uncomment visible from quiz input
					visible: true,
					activityId: baseActivity.id,
					universityId,
					quizQuestions: {
						createMany: {
							data: questions
						}
					}
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async updateQuiz(
		universityId: string,
		id: string,
		data: UpdateQuizInput,
		newFiles: FileUpload[]
	): Promise<QuizReturnType> {
		try {
			const {
				updateBaseActivityFields,
				updateSpecificActivityFields
			} = this.extractUpdateActivityFields(data);
			const baseActivity = await this.updateBaseActivity(
				universityId,
				id,
				updateBaseActivityFields,
				newFiles
			);
			const {
				questions,
				...specificActivityFields
			} = updateSpecificActivityFields;
			const quizIdentification = {
				activityId_universityId: {
					activityId: id,
					universityId
				}
			};
			await this.prisma.$transaction([
				this.prisma.quiz.update({
					where: quizIdentification,
					data: specificActivityFields
				}),
				this.prisma.quizQuestion.deleteMany({
					where: {
						quizId: id
					}
				}),
				this.prisma.quizQuestion.createMany({
					data: questions.map((question) => ({
						...question,
						quizId: id
					}))
				})
			]);
			const specificActivity = await this.prisma.quiz.findUnique({
				where: quizIdentification
			});
			if (!specificActivity) {
				throw new Error(this.NOT_FOUND);
			}

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.code === 'P2025' || e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteActivity(
		universityId: string,
		id: string,
		type: ActivityType
	): Promise<ActivityReturnType> {
		try {
			const relatedActivity = {
				where: {
					activityId_universityId: {
						activityId: id,
						universityId
					}
				}
			};
			let specificActivity: Resource | Assignment | Quiz | null;
			switch (type) {
				case ActivityType.RESOURCE:
					specificActivity = await this.prisma.resource.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.ASSIGNMENT:
					specificActivity = await this.prisma.assignment.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.QUIZ:
				default:
					specificActivity = await this.prisma.quiz.findUnique(
						relatedActivity
					);
			}
			if (!specificActivity) {
				throw new Error(this.NOT_FOUND);
			}
			const baseActivity = await this.prisma.activity.delete({
				where: {
					id_universityId: {
						id,
						universityId
					}
				},
				include: {
					section: {
						select: {
							courseId: true,
							course: {
								select: {
									collegeId: true
								}
							}
						}
					}
				}
			});
			await this.fileService.deleteActivityFiles({
				universityId,
				collegeId: baseActivity.section.course.collegeId,
				courseId: baseActivity.section.courseId,
				sectionId: baseActivity.sectionId,
				activityId: id
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND || e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}
}
