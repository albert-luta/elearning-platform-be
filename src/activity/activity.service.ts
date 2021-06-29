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
import { ActivityReturnType } from './activity.types';
import { BaseActivityInput } from './dto/base-activity.input';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';

@Injectable()
export class ActivityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
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

	private extractActivityFields<
		TData extends
			| CreateResourceInput
			| CreateAssignmentInput
			| CreateQuizInput
	>(
		data: TData
	): {
		baseActivityFields: BaseActivityInput;
		specificActivityFields: Omit<TData, keyof BaseActivityInput>;
	} {
		const {
			sectionId,
			name,
			description,
			...specificActivityFields
		} = data;

		return {
			baseActivityFields: { sectionId, name, description },
			specificActivityFields
		};
	}

	private async createBaseActivity(
		universityId: string,
		type: ActivityType,
		baseActivityFields: BaseActivityInput,
		files: FileUpload[]
	): Promise<Activity> {
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

		const baseActivity = await this.prisma.activity.create({
			data: {
				...baseActivityFields,
				universityId,
				type,
				files: []
			}
		});
		const createdFiles = await this.fileService.createBaseActivityFiles(
			{
				universityId,
				activityId: baseActivity.id,
				sectionId: baseActivity.sectionId,
				courseId: identificationExtraInfos.course.id,
				collegeId: identificationExtraInfos.course.college.id
			},
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
					this.fileService.getFileUrl(file)
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
	): Promise<ActivityReturnType> {
		try {
			const {
				baseActivityFields,
				specificActivityFields
			} = this.extractActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.RESOURCE,
				baseActivityFields,
				files
			);
			const specificActivity = await this.prisma.resource.create({
				data: {
					...specificActivityFields,
					activityId: baseActivity.id,
					universityId
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getFileUrl(file)
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

	async createAssignment(
		universityId: string,
		data: CreateAssignmentInput,
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		try {
			const {
				baseActivityFields,
				specificActivityFields
			} = this.extractActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.ASSIGNMENT,
				baseActivityFields,
				files
			);
			const specificActivity = await this.prisma.assignment.create({
				data: {
					...specificActivityFields,
					activityId: baseActivity.id,
					universityId
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getFileUrl(file)
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

	async createQuiz(
		universityId: string,
		data: CreateQuizInput,
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		try {
			const {
				baseActivityFields,
				specificActivityFields
			} = this.extractActivityFields(data);
			const baseActivity = await this.createBaseActivity(
				universityId,
				ActivityType.QUIZ,
				baseActivityFields,
				files
			);
			const specificActivity = await this.prisma.quiz.create({
				data: {
					...specificActivityFields,
					activityId: baseActivity.id,
					universityId
				}
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getFileUrl(file)
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
			let specificActivity: Resource | Assignment | Quiz;
			switch (type) {
				case ActivityType.RESOURCE:
					specificActivity = await this.prisma.resource.delete(
						relatedActivity
					);
					break;
				case ActivityType.ASSIGNMENT:
					specificActivity = await this.prisma.assignment.delete(
						relatedActivity
					);
					break;
				case ActivityType.QUIZ:
				default:
					specificActivity = await this.prisma.quiz.delete(
						relatedActivity
					);
			}
			const activityIdentification = {
				where: {
					id_universityId: {
						id,
						universityId
					}
				}
			};
			const deleteExtraInfo = await this.prisma.activity.findUnique({
				...activityIdentification,
				select: {
					sectionId: true,
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
			if (!deleteExtraInfo) {
				throw new Error();
			}
			const baseActivity = await this.prisma.activity.delete(
				activityIdentification
			);
			await this.fileService.deleteActivityFiles({
				universityId,
				collegeId: deleteExtraInfo.section.course.collegeId,
				courseId: deleteExtraInfo.section.courseId,
				sectionId: baseActivity.sectionId,
				activityId: id
			});

			return {
				...baseActivity,
				files: baseActivity.files.map((file) =>
					this.fileService.getFileUrl(file)
				),
				...this.normalizeSpecificActivity(specificActivity)
			};
		} catch (e) {
			if (e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}
}
