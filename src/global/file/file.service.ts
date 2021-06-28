import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UNIVERSITY_LOGO, USER_AVATAR } from './file.constants';
import { ActivityIdentification } from './file.types';
import { FileUtilsService } from './services/file-utils';

@Injectable()
export class FileService {
	constructor(private readonly fileUtilsService: FileUtilsService) {}

	getFileUrl(path: string): string {
		return this.fileUtilsService.getFileUrl(path);
	}

	createUserAvatar(userId: string, avatar: FileUpload): Promise<string> {
		return this.fileUtilsService.writeFile(
			avatar,
			this.fileUtilsService.getUserDir(userId),
			USER_AVATAR
		);
	}

	createUniversityLogo(
		universityId: string,
		logo: FileUpload
	): Promise<string> {
		return this.fileUtilsService.writeFile(
			logo,
			this.fileUtilsService.getUniversityDir(universityId),
			UNIVERSITY_LOGO
		);
	}

	createBaseActivityFiles(
		{
			universityId,
			collegeId,
			courseId,
			sectionId,
			activityId
		}: ActivityIdentification,
		files: FileUpload[]
	): Promise<string[]> {
		const activityDir = this.fileUtilsService.getActivityDir(
			universityId,
			collegeId,
			courseId,
			sectionId,
			activityId
		);
		const filesPromises = files.map((file) =>
			this.fileUtilsService.writeFile(file, activityDir)
		);

		return Promise.all(filesPromises);
	}
}
