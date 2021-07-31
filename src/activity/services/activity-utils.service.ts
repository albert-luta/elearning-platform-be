import { Injectable } from '@nestjs/common';
import { FileService } from 'src/global/file/file.service';

@Injectable()
export class ActivityUtilsService {
	constructor(private readonly fileService: FileService) {}

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
}
