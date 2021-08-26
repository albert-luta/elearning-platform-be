import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CourseLoader } from 'src/course/course.loader';
import { CourseReturnType } from 'src/course/course.types';
import { CourseUserObject } from '../dto/course-user.object';
import { CourseUserReturnType } from '../university-user.types';

@Resolver(() => CourseUserObject)
export class CourseUserResolver {
	constructor(private readonly courseLoader: CourseLoader) {}

	@ResolveField()
	course(
		@Parent() courseUser: CourseUserReturnType
	): Promise<CourseReturnType> {
		try {
			return this.courseLoader.byId.load(courseUser.courseId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
