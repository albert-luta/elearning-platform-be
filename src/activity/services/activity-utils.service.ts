import { Injectable } from '@nestjs/common';
import { CreateForumInput } from 'src/forum/dto/create-forum.input';
import { UpdateForumInput } from 'src/forum/dto/update-forum.input';
import { FileService } from 'src/global/file/file.service';
import { Resource, Assignment, Quiz, Forum, Activity } from '.prisma/client';
import { CreateResourceInput } from '../dto/create-resource.input';
import { CreateAssignmentInput } from '../dto/create-assignment.input';
import { CreateQuizInput } from '../dto/create-quiz.input';
import { UpdateResourceInput } from '../dto/update-resource.input';
import { UpdateAssignmentInput } from '../dto/update-assignment.input';
import { UpdateQuizInput } from '../dto/update-quiz.input';
import { FileUpload } from 'graphql-upload';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateBaseActivityInput } from '../dto/create-base-activity.input';
import { UpdateBaseActivityInput } from '../dto/update-base-activity.input';

@Injectable()
export class ActivityUtilsService {
	constructor(
		private readonly fileService: FileService,
		private readonly prisma: PrismaService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	async deleteFiles(
		oldFiles: string[],
		filesToDelete: string[]
	): Promise<string[]> {
		await Promise.all(
			filesToDelete.map((fileUrl) =>
				this.fileService.deletePathFromUrl(fileUrl)
			)
		);
		const filesToDeleteMap = filesToDelete.reduce<Record<string, true>>(
			(acc, val) => ({ ...acc, [val]: true }),
			{}
		);
		const updatedOldFiles = oldFiles
			.filter((file) => !filesToDeleteMap[file])
			.map((fileUrl) => this.fileService.getDbFilePathFromUrl(fileUrl));

		return updatedOldFiles;
	}

	normalizeSpecificActivity<T extends Resource | Assignment | Quiz | Forum>(
		specificActivity: T
	): Omit<T, 'universityId' | 'activityId'> {
		const {
			universityId,
			activityId,
			...normalizedSpecificActivity
		} = specificActivity;

		return normalizedSpecificActivity;
	}

	extractCreateActivityFields<
		TData extends
			| CreateResourceInput
			| CreateAssignmentInput
			| CreateQuizInput
			| CreateForumInput
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

	extractUpdateActivityFields<
		TData extends
			| UpdateResourceInput
			| UpdateAssignmentInput
			| UpdateQuizInput
			| UpdateForumInput
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

	async createBaseActivity(
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

	async updateBaseActivity(
		universityId: string,
		id: string,
		{
			oldFiles,
			filesToDelete,
			...baseActivityFields
		}: UpdateBaseActivityInput,
		newFiles: FileUpload[]
	): Promise<Activity> {
		const updatedOldFiles = await this.deleteFiles(oldFiles, filesToDelete);
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
}
