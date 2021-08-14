import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { CollegeLoader } from 'src/college/college.loader';
import { CollegeReturnType } from 'src/college/college.types';
import { CourseLoader } from 'src/course/course.loader';
import { CourseReturnType } from 'src/course/course.types';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { ActivityService } from './activity.service';
import {
	ActivityReturnType,
	AssignmentReturnType,
	QuizReturnType,
	ResourceReturnType
} from './activity.types';
import { AssignmentObject } from './dto/assignment.object';
import { BaseActivityInterface } from './dto/base-activity.interface';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';
import { QuizObject } from './dto/quiz.object';
import { ResourceObject } from './dto/resource.object';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { UpdateResourceInput } from './dto/update-resource.input';

@Resolver(() => BaseActivityInterface)
export class ActivityResolver {
	constructor(
		private readonly activityService: ActivityService,
		private readonly collegeLoader: CollegeLoader,
		private readonly courseLoader: CourseLoader
	) {}

	@Scopes('read:activity')
	@Query(() => BaseActivityInterface)
	activity(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<ActivityReturnType> {
		return this.activityService.getActivity(universityId, id);
	}

	@Scopes('create:resource')
	@Mutation(() => ResourceObject)
	createResource(
		@UniversityId() universityId: string,
		@Args('data') data: CreateResourceInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ResourceReturnType> {
		return this.activityService.createResource(universityId, data, files);
	}

	@Scopes('update:resource')
	@Mutation(() => ResourceObject)
	updateResource(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateResourceInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ResourceReturnType> {
		return this.activityService.updateResource(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Scopes('create:assignment')
	@Mutation(() => AssignmentObject)
	createAssignment(
		@UniversityId() universityId: string,
		@Args('data') data: CreateAssignmentInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<AssignmentReturnType> {
		return this.activityService.createAssignment(universityId, data, files);
	}

	@Scopes('update:assignment')
	@Mutation(() => AssignmentObject)
	updateAssignment(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateAssignmentInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<AssignmentReturnType> {
		return this.activityService.updateAssignment(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Scopes('create:quiz')
	@Mutation(() => QuizObject)
	createQuiz(
		@UniversityId() universityId: string,
		@Args('data') data: CreateQuizInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<QuizReturnType> {
		return this.activityService.createQuiz(universityId, data, files);
	}

	@Scopes('update:quiz')
	@Mutation(() => QuizObject)
	updateQuiz(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateQuizInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<QuizReturnType> {
		return this.activityService.updateQuiz(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Scopes('delete:activity')
	@Mutation(() => BaseActivityInterface)
	deleteActivity(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('type', { type: () => ActivityType }) type: ActivityType
	): Promise<ActivityReturnType> {
		return this.activityService.deleteActivity(universityId, id, type);
	}

	@Scopes('read:upcoming-activities')
	@Query(() => [BaseActivityInterface])
	upcomingActivities(
		@UniversityId() universityId: string,
		@User() user: UserType
	): Promise<ActivityReturnType[]> {
		return this.activityService.getUpcomingActivities(
			universityId,
			user.id
		);
	}

	@ResolveField()
	college(
		@Parent() activity: ActivityReturnType
	): Promise<CollegeReturnType> {
		try {
			return this.collegeLoader.byActivityId.load(activity.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	@ResolveField()
	course(@Parent() activity: ActivityReturnType): Promise<CourseReturnType> {
		try {
			return this.courseLoader.byActivityId.load(activity.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}

// Quiz specific:
// TODO: let users create multiple quiz tries
// TODO: let users review their quiz tries
// TODO: let teachers select the maximum number of quiz tries
// TODO: exclude teachers and admins from quiz tries
// TODO: endpoint myTries(only for teachers and admins)
// TODO: sort quiz tries by userName and createdAt
// TODO: let teachers and admins create infinite quiz tries

// TODO: attempt/query quiz should shuffle if necessary(questions/answers)

// TODO: show only visible quizes to students
