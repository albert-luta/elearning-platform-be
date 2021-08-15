import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseLoader } from './course.loader';
import { ActivityGradeLoader } from './loaders/activity-grade.loader';

@Module({
	providers: [
		CourseResolver,
		CourseService,
		CourseLoader,
		ActivityGradeLoader
	],
	exports: [CourseLoader]
})
export class CourseModule {}
