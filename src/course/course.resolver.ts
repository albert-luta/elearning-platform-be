import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { CourseService } from './course.service';
import { CourseReturnType } from './course.types';
import { CourseObject } from './dto/course.object';
import { CreateCourseInput } from './dto/create-course.input';

@Resolver()
export class CourseResolver {
	constructor(private readonly courseService: CourseService) {}

	@Scopes('create:course')
	@Mutation(() => CourseObject)
	createCourse(
		@UniversityId() universityId: string,
		@Args('data') data: CreateCourseInput
	): Promise<CourseReturnType> {
		return this.courseService.createCourse(universityId, data);
	}

	@Scopes('update:course')
	@Mutation(() => CourseObject)
	updateCourse(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: CreateCourseInput
	): Promise<CourseReturnType> {
		return this.courseService.updateCourse(universityId, id, data);
	}

	@Scopes('delete:course')
	@Mutation(() => CourseObject)
	deleteCourse(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<CourseReturnType> {
		return this.courseService.deleteCourse(universityId, id);
	}
}
