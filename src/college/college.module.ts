import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeResolver } from './college.resolver';
import { CourseModule } from 'src/course/course.module';
import { CollegeLoader } from './college.loader';

@Module({
	providers: [CollegeResolver, CollegeService, CollegeLoader],
	imports: [CourseModule],
	exports: [CollegeLoader]
})
export class CollegeModule {}
