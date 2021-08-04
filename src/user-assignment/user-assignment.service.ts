import { UserLoader } from 'src/user/user.loader';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UserAssignmentReturnType } from 'src/activity/activity.types';
import { UpdateMyAssignmentInput } from 'src/activity/dto/update-my-assignment.input';
import { ActivityUtilsService } from 'src/activity/services/activity-utils.service';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserReturnType } from 'src/user/user.types';
import { UpdateUserAssignmentInput } from './dto/update-user-assignment.input';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { MyBadRequestError } from 'src/general/error-handling/errors/my-bad-request.error';

@Injectable()
export class UserAssignmentService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService,
		private readonly activityUtilsService: ActivityUtilsService,
		private readonly userLoader: UserLoader
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	async getMyAssignment(
		userId: string,
		id: string
	): Promise<UserAssignmentReturnType | null> {
		try {
			const myAssignment = await this.prisma.userAssignment.findUnique({
				where: {
					userId_assignmentId: {
						userId,
						assignmentId: id
					}
				}
			});

			return (
				myAssignment && {
					...myAssignment,
					files: myAssignment.files.map((file) =>
						this.fileService.getUrlFromDbFilePath(file)
					)
				}
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateMyAssignment(
		universityId: string,
		userId: string,
		id: string,
		{ oldFiles, filesToDelete }: UpdateMyAssignmentInput,
		newFiles: FileUpload[]
	): Promise<UserAssignmentReturnType> {
		try {
			const updatedOldFiles = await this.activityUtilsService.deleteFiles(
				oldFiles,
				filesToDelete
			);
			const identificationExtraInfos = await this.prisma.activity.findUnique(
				{
					where: {
						id_universityId: {
							id,
							universityId
						}
					},
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
				}
			);
			if (!identificationExtraInfos) {
				throw new Error(this.NOT_FOUND);
			}
			const createdNewFiles = await this.fileService.createUserActivityFiles(
				{
					universityId,
					userId,
					activityId: id,
					sectionId: identificationExtraInfos.sectionId,
					courseId: identificationExtraInfos.section.courseId,
					collegeId: identificationExtraInfos.section.course.collegeId
				},
				newFiles
			);
			const files = [
				...new Set([...updatedOldFiles, ...createdNewFiles])
			];
			const userAssignment = await this.prisma.userAssignment.upsert({
				where: {
					userId_assignmentId: {
						userId,
						assignmentId: id
					}
				},
				update: {
					files
				},
				create: {
					files,
					userId,
					assignmentId: id
				}
			});

			return {
				...userAssignment,
				files: userAssignment.files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				)
			};
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async getUserAssignment(
		id: string
	): Promise<UserAssignmentReturnType | null> {
		try {
			const userAssignment = await this.prisma.userAssignment.findUnique({
				where: {
					id
				}
			});

			return (
				userAssignment && {
					...userAssignment,
					files: userAssignment.files.map((file) =>
						this.fileService.getUrlFromDbFilePath(file)
					)
				}
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	private readonly MAX_GRADE_EXCEEDED = 'MAX_GRADE_EXCEEDED';
	async updateUserAssignment(
		id: string,
		data: UpdateUserAssignmentInput
	): Promise<UserAssignmentReturnType> {
		try {
			const oldUserAssignment = await this.prisma.userAssignment.findUnique(
				{
					where: {
						id
					},
					select: {
						assignment: {
							select: {
								maxGrade: true
							}
						}
					}
				}
			);
			if (!oldUserAssignment) {
				throw new Error(this.NOT_FOUND);
			}
			if (
				data.grade != null &&
				data.grade > oldUserAssignment.assignment.maxGrade
			) {
				throw new MyBadRequestError({
					grade:
						'Max grade allowed is ' +
						oldUserAssignment.assignment.maxGrade
				});
			}
			const userAssignment = await this.prisma.userAssignment.update({
				where: {
					id
				},
				data
			});

			return userAssignment;
		} catch (e) {
			if (e.message === this.NOT_FOUND || e.code === 'P2025') {
				throw new NotFoundException();
			} else if (e instanceof MyBadRequestError) {
				throw new MyBadRequestException(e.data);
			}

			throw new InternalServerErrorException();
		}
	}

	async getUserAssignments(
		assignmentId: string
	): Promise<UserAssignmentReturnType[]> {
		try {
			const userAssignments = await this.prisma.userAssignment.findMany({
				where: {
					assignmentId
				}
			});

			return userAssignments.map(({ files, ...userAssignment }) => ({
				...userAssignment,
				files: files.map((file) =>
					this.fileService.getUrlFromDbFilePath(file)
				)
			}));
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getUser(id: string): Promise<UserReturnType> {
		try {
			const { avatar, ...user } = await this.userLoader.byId.load(id);

			return {
				...user,
				avatar: avatar && this.fileService.getUrlFromDbFilePath(avatar)
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
