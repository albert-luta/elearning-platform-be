import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CourseService } from './course.service';
import { CourseReturnType } from './course.types';
import { ActivityGradeObject } from './dto/activity-grade.object';
import { CourseObject } from './dto/course.object';
import { CreateCourseInput } from './dto/create-course.input';
import { ActivityGradeLoader } from './loaders/activity-grade.loader';

@Resolver(() => CourseObject)
export class CourseResolver {
	constructor(
		private readonly courseService: CourseService,
		private readonly activityGradeLoader: ActivityGradeLoader
	) {}

	@Scopes('create:course')
	@Mutation(() => CourseObject)
	createCourse(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Args('data') data: CreateCourseInput
	): Promise<CourseReturnType> {
		return this.courseService.createCourse(universityId, user.id, data);
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

	@ResolveField()
	activitiesGrade(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Parent() course: CourseReturnType
	): Promise<ActivityGradeObject[]> {
		try {
			return this.activityGradeLoader
				.byCourseId(universityId, user.id)
				.load(course.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
