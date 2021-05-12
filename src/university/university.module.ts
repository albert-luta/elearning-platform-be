import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { UniversityResolver } from './university.resolver';

@Module({
	providers: [UniversityService, UniversityResolver]
})
export class UniversityModule {}
