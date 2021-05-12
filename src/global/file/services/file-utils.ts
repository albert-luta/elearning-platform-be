import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import * as p from 'path';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import {
	PUBLIC_DIR_NAME,
	UNIVERSITIES_DIR_NAME,
	UPLOADS_DIR_NAME,
	USERS_DIR_NAME
} from '../file.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUtilsService {
	constructor(private readonly configService: ConfigService) {}

	private uploadsDir = p.resolve(
		p.dirname(p.dirname(require.main?.filename ?? '')),
		PUBLIC_DIR_NAME,
		UPLOADS_DIR_NAME
	);
	private usersDir = p.resolve(this.uploadsDir, USERS_DIR_NAME);
	private universitiesDir = p.resolve(this.uploadsDir, UNIVERSITIES_DIR_NAME);

	getUserDir(userId: string): string {
		return p.resolve(this.usersDir, userId);
	}
	getUniversityDir(universityId: string): string {
		return p.resolve(this.universitiesDir, universityId);
	}

	async writeFile(
		file: FileUpload,
		dir: string,
		name?: string
	): Promise<string> {
		await fsp.mkdir(dir, { recursive: true });

		const absolutePath = p.join(
			dir,
			name ? `${name}${p.extname(file.filename)}` : file.filename
		);
		const relativePath = p.relative(this.uploadsDir, absolutePath);

		return new Promise((res, rej) => {
			file.createReadStream()
				.pipe(fs.createWriteStream(absolutePath))
				.on('finish', () => res(relativePath))
				.on('error', () => rej(new InternalServerErrorException()));
		});
	}

	getFileUrl(path: string): string {
		const correctPath = p
			.join(UPLOADS_DIR_NAME, path)
			.split(p.sep)
			.join(p.posix.sep);

		return encodeURI(
			`${this.configService.get<string>('BACKEND_URL')}/${correctPath}`
		);
	}
}
