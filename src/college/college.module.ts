import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeResolver } from './college.resolver';
import { CourseModule } from 'src/course/course.module';

@Module({
	providers: [CollegeResolver, CollegeService],
	imports: [CourseModule]
})
export class CollegeModule {}
