import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { ActivityService } from './activity.service';
import { ActivityReturnType } from './activity.types';
import { BaseActivityInterface } from './dto/base-activity.interface';
import { CreateAssignmentInput } from './dto/create-assignment.input';
import { CreateQuizInput } from './dto/create-quiz.input';
import { CreateResourceInput } from './dto/create-resource.input';
import { UpdateAssignmentInput } from './dto/update-assignment.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { UpdateResourceInput } from './dto/update-resource.input';

@Resolver()
export class ActivityResolver {
	constructor(private readonly activityService: ActivityService) {}

	@Query(() => BaseActivityInterface)
	activity(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<ActivityReturnType> {
		return this.activityService.getActivity(universityId, id);
	}

	@Mutation(() => BaseActivityInterface)
	createResource(
		@UniversityId() universityId: string,
		@Args('data') data: CreateResourceInput,
		@Args({ name: 'files', type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createResource(universityId, data, files);
	}

	@Mutation(() => BaseActivityInterface)
	updateResource(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateResourceInput,
		@Args({ name: 'newFiles', type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.updateResource(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Mutation(() => BaseActivityInterface)
	createAssignment(
		@UniversityId() universityId: string,
		@Args('data') data: CreateAssignmentInput,
		@Args({ name: 'files', type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createAssignment(universityId, data, files);
	}

	@Mutation(() => BaseActivityInterface)
	updateAssignment(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateAssignmentInput,
		@Args({ name: 'newFiles', type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.updateAssignment(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Mutation(() => BaseActivityInterface)
	createQuiz(
		@UniversityId() universityId: string,
		@Args('data') data: CreateQuizInput,
		@Args({ name: 'files', type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.createQuiz(universityId, data, files);
	}

	@Mutation(() => BaseActivityInterface)
	updateQuiz(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateQuizInput,
		@Args({ name: 'newFiles', type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ActivityReturnType> {
		return this.activityService.updateQuiz(
			universityId,
			id,
			data,
			newFiles
		);
	}

	@Mutation(() => BaseActivityInterface)
	deleteActivity(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('type', { type: () => ActivityType }) type: ActivityType
	): Promise<ActivityReturnType> {
		return this.activityService.deleteActivity(universityId, id, type);
	}
}
