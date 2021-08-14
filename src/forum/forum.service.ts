import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { ActivityUtilsService } from 'src/activity/services/activity-utils.service';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateForumCommentInput } from './dto/create-forum-comment.input';
import { CreateForumInput } from './dto/create-forum.input';
import { UpdateForumInput } from './dto/update-forum.input';
import { ForumCommentReturnType, ForumReturnType } from './forum.types';

@Injectable()
export class ForumService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityUtilsService: ActivityUtilsService,
		private readonly fileService: FileService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	async createForum(
		userId: string,
		universityId: string,
		data: CreateForumInput,
		files: FileUpload[]
	): Promise<ForumReturnType> {
		try {
			const universityUser = await this.prisma.universityUser.findUnique({
				where: {
					universityId_userId: {
						userId,
						universityId
					}
				}
			});
			if (!universityUser) {
				throw new Error(this.NOT_FOUND);
			}
			const {
				createBaseActivityFields,
				createSpecificActivityFields
			} = this.activityUtilsService.extractCreateActivityFields(data);
			const baseActivity = await this.activityUtilsService.createBaseActivity(
				universityId,
				ActivityType.FORUM,
				createBaseActivityFields,
				files
			);
			const specificActivity = await this.prisma.forum.create({
				data: {
					...createSpecificActivityFields,
					activityId: baseActivity.id,
					universityId,
					universityUserId: universityUser.id
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

	async updateForum(
		userId: string,
		universityId: string,
		id: string,
		data: UpdateForumInput,
		newFiles: FileUpload[]
	): Promise<ForumReturnType> {
		try {
			const universityUser = await this.prisma.universityUser.findUnique({
				where: {
					universityId_userId: {
						userId,
						universityId
					}
				}
			});
			if (!universityUser) {
				throw new Error(this.NOT_FOUND);
			}
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
			const specificActivity = await this.prisma.forum.update({
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

	async getForumComments(forumId: string): Promise<ForumCommentReturnType[]> {
		try {
			const forumComments = await this.prisma.forumComment.findMany({
				where: {
					forumId
				},
				orderBy: {
					createdAt: 'asc'
				}
			});

			return forumComments;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createForumComment(
		universityId: string,
		userId: string,
		forumId: string,
		data: CreateForumCommentInput
	): Promise<ForumCommentReturnType> {
		try {
			const forumComment = await this.prisma.forumComment.create({
				data: {
					...data,
					forum: {
						connect: {
							activityId: forumId
						}
					},
					universityUser: {
						connect: {
							universityId_userId: {
								userId,
								universityId
							}
						}
					}
				}
			});

			return forumComment;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
