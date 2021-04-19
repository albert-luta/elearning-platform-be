import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';

@Module({
	providers: [UniversityService]
})
export class UniversityModule {}
