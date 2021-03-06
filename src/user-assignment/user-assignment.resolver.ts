import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateMyAssignmentInput } from 'src/user-assignment/dto/update-my-assignment.input';
import { UserAssignmentObject } from 'src/user-assignment/dto/user-assignment.object';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { UserReturnType } from 'src/user/user.types';
import { UpdateUserAssignmentInput } from './dto/update-user-assignment.input';
import { UserAssignmentService } from './user-assignment.service';
import { UserAssignmentReturnType } from './user-assignment.types';

@Resolver(() => UserAssignmentObject)
export class UserAssignmentResolver {
	constructor(
		private readonly userAssignmentService: UserAssignmentService
	) {}

	@Scopes('read:my-assignment')
	@Query(() => UserAssignmentObject, { nullable: true })
	myAssignment(
		@User() user: UserType,
		@Args('id') id: string
	): Promise<UserAssignmentReturnType | null> {
		return this.userAssignmentService.getMyAssignment(user.id, id);
	}

	@Scopes('update:my-assignment')
	@Mutation(() => UserAssignmentObject)
	updateMyAssignment(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Args('id') id: string,
		@Args('data') data: UpdateMyAssignmentInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<UserAssignmentReturnType> {
		return this.userAssignmentService.updateMyAssignment(
			universityId,
			user.id,
			id,
			data,
			newFiles
		);
	}

	@Scopes('read:user-assignment')
	@Query(() => UserAssignmentObject, { nullable: true })
	userAssignment(
		@Args('id') id: string
	): Promise<UserAssignmentReturnType | null> {
		return this.userAssignmentService.getUserAssignment(id);
	}

	@Scopes('update:user-assignment')
	@Mutation(() => UserAssignmentObject)
	updateUserAssignment(
		@Args('id') id: string,
		@Args('data') data: UpdateUserAssignmentInput
	): Promise<UserAssignmentReturnType> {
		return this.userAssignmentService.updateUserAssignment(id, data);
	}

	@Scopes('read:user-assignments')
	@Query(() => [UserAssignmentObject])
	userAssignments(
		@Args('assignmentId') assignmentId: string
	): Promise<UserAssignmentReturnType[]> {
		return this.userAssignmentService.getUserAssignments(assignmentId);
	}

	@ResolveField()
	user(
		@Parent() userAssignment: UserAssignmentReturnType
	): Promise<UserReturnType> {
		return this.userAssignmentService.getUser(userAssignment.userId);
	}
}
