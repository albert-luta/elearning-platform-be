import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { CourseLoader } from 'src/course/course.loader';
import { CourseReturnType } from 'src/course/course.types';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CollegeService } from './college.service';
import { CollegeReturnType } from './college.types';
import { CollegeObject } from './dto/college.object';
import { CreateCollegeInput } from './dto/create-college.input';

@Resolver(() => CollegeObject)
export class CollegeResolver {
	constructor(
		private readonly collegeService: CollegeService,
		private readonly courseLoader: CourseLoader
	) {}

	@Scopes('read:colleges')
	@Query(() => [CollegeObject])
	colleges(
		@Args('universityId') universityId: string
	): Promise<CollegeReturnType[]> {
		return this.collegeService.getColleges(universityId);
	}

	@ResolveField()
	courses(@Parent() college: CollegeObject): Promise<CourseReturnType[]> {
		try {
			return this.courseLoader.byCollegeId.load(college.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	@Scopes('create:college')
	@Mutation(() => CollegeObject)
	createCollege(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Args('data') data: CreateCollegeInput
	): Promise<CollegeReturnType> {
		return this.collegeService.createCollege(universityId, user.id, data);
	}

	@Scopes('update:college')
	@Mutation(() => CollegeObject)
	updateCollege(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: CreateCollegeInput
	): Promise<CollegeReturnType> {
		return this.collegeService.updateCollege(universityId, id, data);
	}

	@Scopes('delete:college')
	@Mutation(() => CollegeObject)
	deleteCollege(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<CollegeReturnType> {
		return this.collegeService.deleteCollege(universityId, id);
	}
}
