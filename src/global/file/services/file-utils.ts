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

@Injectable()
export class FileUtilsService {
	constructor(private readonly configService: ConfigService) {}

	private readonly UPLOADS_DIR = p.resolve(
		p.dirname(p.dirname(p.dirname(require.main?.filename ?? ''))),
		PUBLIC_DIR_NAME,
		UPLOADS_DIR_NAME
	);

	private toUnix(path: string): string {
		return path.split(p.sep).join(p.posix.sep);
	}

	getUserDir(userId: string): string {
		return p.join(this.UPLOADS_DIR, USERS_DIR_NAME, userId);
	}
	getUniversityDir(universityId: string): string {
		return p.join(this.UPLOADS_DIR, UNIVERSITIES_DIR_NAME, universityId);
	}
	getCollegeDir(universityId: string, collegeId: string): string {
		return p.join(
			this.getUniversityDir(universityId),
			COLLEGES_DIR_NAME,
			collegeId
		);
	}
	getCourseDir(
		universityId: string,
		collegeId: string,
		courseId: string
	): string {
		return p.join(
			this.getCollegeDir(universityId, collegeId),
			COURSES_DIR_NAME,
			courseId
		);
	}
	getSectionDir(
		universityId: string,
		collegeId: string,
		courseId: string,
		sectionId: string
	): string {
		return p.join(
			this.getCourseDir(universityId, collegeId, courseId),
			SECTIONS_DIR_NAME,
			sectionId
		);
	}
	getActivityDir(
		universityId: string,
		collegeId: string,
		courseId: string,
		sectionId: string,
		activityId: string
	): string {
		return p.join(
			this.getSectionDir(universityId, collegeId, courseId, sectionId),
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
		const relativePath = p.relative(this.UPLOADS_DIR, absolutePath);

		return new Promise((res, rej) => {
			file.createReadStream()
				.pipe(fs.createWriteStream(absolutePath))
				.on('finish', () => res(this.toUnix(relativePath)))
				.on('error', () => rej(new InternalServerErrorException()));
		});
	}

	getFileUrl(path: string): string {
		return encodeURI(
			`${this.configService.get<string>('BACKEND_URL')}/${p.join(
				UPLOADS_DIR_NAME,
				path
			)}`
		);
	}
}
