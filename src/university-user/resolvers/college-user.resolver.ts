import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CollegeLoader } from 'src/college/college.loader';
import { CollegeReturnType } from 'src/college/college.types';
import { CollegeUserObject } from '../dto/college-user.object';
import { CourseUserLoader } from '../loaders/course-user.loader';
import {
	CollegeUserReturnType,
	CourseUserReturnType
} from '../university-user.types';

@Resolver(() => CollegeUserObject)
export class CollegeUserResolver {
	constructor(
		private readonly collegeLoader: CollegeLoader,
		private readonly courseUserLoader: CourseUserLoader
	) {}

	@ResolveField()
	college(
		@Parent() collegeUser: CollegeUserReturnType
	): Promise<CollegeReturnType> {
		try {
			return this.collegeLoader.byId.load(collegeUser.collegeId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	@ResolveField()
	coursesEnrolledAt(
		@Parent() collegeUser: CollegeUserReturnType
	): Promise<CourseUserReturnType[]> {
		try {
			return this.courseUserLoader.byCollegeUserId.load(collegeUser.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
