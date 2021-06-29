import { Global, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileUtilsService } from './services/file-utils.service';

@Global()
@Module({
	providers: [FileService, FileUtilsService],
	exports: [FileService]
})
export class FileGlobalModule {}
