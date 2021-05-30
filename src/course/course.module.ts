import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseLoader } from './course.loader';

@Module({
	providers: [CourseResolver, CourseService, CourseLoader],
	exports: [CourseLoader]
})
export class CourseModule {}
