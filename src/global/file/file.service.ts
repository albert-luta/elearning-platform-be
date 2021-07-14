import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UNIVERSITY_LOGO, USER_AVATAR } from './file.constants';
import {
	ActivityIdentification,
	CollegeIdentification,
	CourseIdentification,
	SectionIdentification,
	UniversityIdentification
} from './file.types';
import { FileUtilsService } from './services/file-utils.service';

@Injectable()
export class FileService {
	constructor(private readonly fileUtilsService: FileUtilsService) {}

	getUrlFromDbFilePath(path: string): string {
		return this.fileUtilsService.getUrlFromDbFilePath(path);
	}
	getDbFilePathFromUrl(url: string): string {
		return this.fileUtilsService.getDbFilePathFromUrl(url);
	}

	deletePathFromUrl(url: string): Promise<void> {
		return this.fileUtilsService.deleteFromPath(
			this.fileUtilsService.getAbsoluteFilePathFromUrl(url)
		);
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
			this.fileUtilsService.getUniversityDir({ universityId }),
			UNIVERSITY_LOGO
		);
	}

	createBaseActivityFiles(
		activityIdentification: ActivityIdentification,
		files: FileUpload[]
	): Promise<string[]> {
		const activityDir = this.fileUtilsService.getActivityDir(
			activityIdentification
		);
		const filesPromises = files.map((file) =>
			this.fileUtilsService.writeFile(file, activityDir)
		);

		return Promise.all(filesPromises);
	}

	deleteUniversityFiles(
		universityIdentification: UniversityIdentification
	): Promise<void> {
		const universityDir = this.fileUtilsService.getUniversityDir(
			universityIdentification
		);

		return this.fileUtilsService.deleteFromPath(universityDir);
	}

	deleteCollegeFiles(
		collegeIdentification: CollegeIdentification
	): Promise<void> {
		const collegeDir = this.fileUtilsService.getCollegeDir(
			collegeIdentification
		);

		return this.fileUtilsService.deleteFromPath(collegeDir);
	}

	deleteCourseFiles(
		courseIdentification: CourseIdentification
	): Promise<void> {
		const courseDir = this.fileUtilsService.getCourseDir(
			courseIdentification
		);

		return this.fileUtilsService.deleteFromPath(courseDir);
	}

	deleteSectionFiles(
		sectionIdentification: SectionIdentification
	): Promise<void> {
		const sectionDir = this.fileUtilsService.getSectionDir(
			sectionIdentification
		);

		return this.fileUtilsService.deleteFromPath(sectionDir);
	}

	deleteActivityFiles(
		activityIdentification: ActivityIdentification
	): Promise<void> {
		const activityDir = this.fileUtilsService.getActivityDir(
			activityIdentification
		);

		return this.fileUtilsService.deleteFromPath(activityDir);
	}
}
