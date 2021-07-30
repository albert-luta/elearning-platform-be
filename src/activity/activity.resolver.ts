import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { ActivityService } from './activity.service';
import { ActivityReturnType } from './activity.types';
import { BaseActivityInterface } from './dto/base-activity.interface';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { UpdateResourceInput } from './dto/update-resource.input';
import { UserAssignmentObject } from './dto/user-assignment.object';

@Resolver()
export class ActivityResolver {
	constructor(private readonly activityService: ActivityService) {}

	@Scopes('read:activity')
	@Query(() => BaseActivityInterface)
	activity(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<ActivityReturnType> {
		return this.activityService.getActivity(universityId, id);
	}

	@Scopes('create:resource')
	@Mutation(() => BaseActivityInterface)
	createResource(
		@UniversityId() universityId: string,
		@Args('data') data: CreateResourceInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createResource(universityId, data, files);
	}

	@Scopes('update:resource')
	@Mutation(() => BaseActivityInterface)
	updateResource(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateResourceInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.updateResource(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Scopes('create:assignment')
	@Mutation(() => BaseActivityInterface)
	createAssignment(
		@UniversityId() universityId: string,
		@Args('data') data: CreateAssignmentInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createAssignment(universityId, data, files);
	}

	@Scopes('update:assignment')
	@Mutation(() => BaseActivityInterface)
	updateAssignment(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateAssignmentInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.updateAssignment(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Scopes('create:quiz')
	@Mutation(() => BaseActivityInterface)
	createQuiz(
		@UniversityId() universityId: string,
		@Args('data') data: CreateQuizInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createQuiz(universityId, data, files);
	}

	@Scopes('update:quiz')
	@Mutation(() => BaseActivityInterface)
	updateQuiz(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateQuizInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
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

	@Scopes('read:my-assignment')
	@Query(() => UserAssignmentObject, { nullable: true })
	myAssignment(
		@User() user: UserType,
		@Args('id') id: string
	): Promise<UserAssignmentObject | null> {
		return this.activityService.getMyAssignment(user.id, id);
	}

	@Scopes('read:user-assignments')
	@Query(() => [UserAssignmentObject])
	userAssignments(@Args('id') id: string): Promise<UserAssignmentObject[]> {
		return this.activityService.getUserAssignments(id);
	}
}
