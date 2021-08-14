import { Assignment, Quiz, Resource, Forum, Activity } from '.prisma/client';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import {
	ActivityReturnType,
	AssignmentReturnType,
	QuizReturnType,
	ResourceReturnType
} from './activity.types';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { ActivityUtilsService } from './services/activity-utils.service';

@Injectable()
export class ActivityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService,
		private readonly activityUtilsService: ActivityUtilsService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';
	private readonly INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

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
			let specificActivity: Resource | Assignment | Quiz | Forum | null;
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
					specificActivity = await this.prisma.quiz.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.FORUM:
				default:
					specificActivity = await this.prisma.forum.findUnique(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
	): Promise<ResourceReturnType> {
		try {
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.activityUtilsService.extractCreateActivityFields(data);
			const baseActivity = await this.activityUtilsService.createBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
	): Promise<ResourceReturnType> {
		try {
			const {
				updateBaseActivityFields,
				updateSpecificActivityFields
			} = this.activityUtilsService.extractUpdateActivityFields(data);
			const baseActivity = await this.activityUtilsService.updateBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
	): Promise<AssignmentReturnType> {
		try {
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.activityUtilsService.extractCreateActivityFields(data);
			const baseActivity = await this.activityUtilsService.createBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
			};
		} catch (e) {
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
	): Promise<AssignmentReturnType> {
		try {
			const {
				updateBaseActivityFields,
				updateSpecificActivityFields
			} = this.activityUtilsService.extractUpdateActivityFields(data);
			const baseActivity = await this.activityUtilsService.updateBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
			} = this.activityUtilsService.extractCreateActivityFields(data);
			const baseActivity = await this.activityUtilsService.createBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
			} = this.activityUtilsService.extractUpdateActivityFields(data);
			const baseActivity = await this.activityUtilsService.updateBaseActivity(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
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
			let specificActivity: Resource | Assignment | Quiz | Forum | null;
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
					specificActivity = await this.prisma.quiz.findUnique(
						relatedActivity
					);
					break;
				case ActivityType.FORUM:
				default:
					specificActivity = await this.prisma.forum.findUnique(
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
				...this.activityUtilsService.normalizeSpecificActivity(
					specificActivity
				)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND || e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async getUpcomingActivities(
		universityId: string,
		userId: string
	): Promise<ActivityReturnType[]> {
		try {
			const identification = {
				activity: {
					section: {
						course: {
							courseUsers: {
								some: {
									collegeUser: {
										universityUser: {
											universityId,
											userId
										}
									}
								}
							}
						}
					}
				}
			};

			const [upcomingAssignments, upcomingQuizes] = await Promise.all([
				this.prisma.assignment.findMany({
					where: {
						deadline: {
							gt: new Date()
						},
						...identification
					},
					include: {
						activity: true
					}
				}),
				this.prisma.quiz.findMany({
					where: {
						timeOpen: {
							gt: new Date()
						},
						...identification
					},
					include: {
						activity: true
					}
				})
			]);

			const sortedActivities = [
				...upcomingAssignments,
				...upcomingQuizes
			].sort(
				(a, b) =>
					this.getActivityCompareNumber(a) -
					this.getActivityCompareNumber(b)
			);

			return sortedActivities.map(
				({ activity, ...specificActivity }) => ({
					...activity,
					...specificActivity
				})
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	private getActivityCompareNumber(
		specificActivity: (Assignment | Quiz) & { activity: Activity }
	): number {
		if (specificActivity.activity.type === ActivityType.ASSIGNMENT) {
			return (specificActivity as Assignment).deadline.getTime();
		} else {
			return (specificActivity as Quiz).timeOpen.getTime();
		}
	}
}
