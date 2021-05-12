import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UNIVERSITY_LOGO, USER_AVATAR } from './file.constants';
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
}
