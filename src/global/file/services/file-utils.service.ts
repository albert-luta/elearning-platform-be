import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import p from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import {
	ACTIVITIES_DIR_NAME,
	COLLEGES_DIR_NAME,
	COURSES_DIR_NAME,
	PUBLIC_DIR_NAME,
	SECTIONS_DIR_NAME,
	UNIVERSITIES_DIR_NAME,
	UPLOADS_DIR_NAME,
	USERS_DIR_NAME
} from '../file.constants';
import { ConfigService } from '@nestjs/config';
import {
	ActivityIdentification,
	CollegeIdentification,
	CourseIdentification,
	SectionIdentification,
	UniversityIdentification
} from '../file.types';

@Injectable()
export class FileUtilsService {
	constructor(private readonly configService: ConfigService) {}

	private readonly UPLOADS_DIR_PATH = p.resolve(
		p.dirname(p.dirname(p.dirname(require.main?.filename ?? ''))),
		PUBLIC_DIR_NAME,
		UPLOADS_DIR_NAME
	);

	private toUnix(path: string): string {
		return path.split(p.sep).join(p.posix.sep);
	}

	getUserDir(userId: string): string {
		return p.join(this.UPLOADS_DIR_PATH, USERS_DIR_NAME, userId);
	}
	getUniversityDir({ universityId }: UniversityIdentification): string {
		return p.join(
			this.UPLOADS_DIR_PATH,
			UNIVERSITIES_DIR_NAME,
			universityId
		);
	}
	getCollegeDir({
		collegeId,
		...universityIdentification
	}: CollegeIdentification): string {
		return p.join(
			this.getUniversityDir(universityIdentification),
			COLLEGES_DIR_NAME,
			collegeId
		);
	}
	getCourseDir({
		courseId,
		...collegeIdentification
	}: CourseIdentification): string {
		return p.join(
			this.getCollegeDir(collegeIdentification),
			COURSES_DIR_NAME,
			courseId
		);
	}
	getSectionDir({
		sectionId,
		...courseIdentificaton
	}: SectionIdentification): string {
		return p.join(
			this.getCourseDir(courseIdentificaton),
			SECTIONS_DIR_NAME,
			sectionId
		);
	}
	getActivityDir({
		activityId,
		...sectionIdentification
	}: ActivityIdentification): string {
		return p.join(
			this.getSectionDir(sectionIdentification),
			ACTIVITIES_DIR_NAME,
			activityId
		);
	}

	async writeFile(
		filePromise: FileUpload,
		dir: string,
		name?: string
	): Promise<string> {
		await fsp.mkdir(dir, { recursive: true });

		const file = (await (filePromise as any)) as FileUpload;
		const absolutePath = p.join(
			dir,
			name ? `${name}${p.extname(file.filename)}` : file.filename
		);
		const relativePath = p.relative(this.UPLOADS_DIR_PATH, absolutePath);

		return new Promise((res, rej) => {
			file.createReadStream()
				.pipe(fs.createWriteStream(absolutePath))
				.on('finish', () => res(this.toUnix(relativePath)))
				.on('error', () => rej(new InternalServerErrorException()));
		});
	}

	deleteFromPath(path: string): Promise<void> {
		return fsp.rm(path, { recursive: true, force: true });
	}

	getUrlFromDbFilePath(path: string): string {
		return encodeURI(
			`${this.configService.get<string>('BACKEND_URL') ?? ''}/${p.join(
				UPLOADS_DIR_NAME,
				path
			)}`
		);
	}
	getDbFilePathFromUrl(url: string): string {
		return decodeURI(url)
			.replace(
				`${
					this.configService.get<string>('BACKEND_URL') ?? ''
				}/${UPLOADS_DIR_NAME}`,
				''
			)
			.slice(1);
	}
	getAbsoluteFilePathFromUrl(url: string): string {
		return p.join(this.UPLOADS_DIR_PATH, this.getDbFilePathFromUrl(url));
	}
}
