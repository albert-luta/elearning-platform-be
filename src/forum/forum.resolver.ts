import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { ForumObject } from 'src/forum/dto/forum.object';
import { UniversityUserLoader } from 'src/university-user/university-user.loader';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { CreateForumInput } from './dto/create-forum.input';
import { ForumReturnType } from './forum.types';
import { ForumService } from './forum.service';
import { User } from 'src/user/decorators/user.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UpdateForumInput } from './dto/update-forum.input';
import { UniversityUserReturnType } from 'src/university-user/university-user.types';

@Resolver(() => ForumObject)
export class ForumResolver {
	constructor(
		private readonly forumService: ForumService,
		private readonly universityUserLoader: UniversityUserLoader
	) {}

	@Scopes('create:forum')
	@Mutation(() => ForumObject)
	createForum(
		@User() user: UserType,
		@UniversityId() universityId: string,
		@Args('data') data: CreateForumInput,
		@Args('files', { type: () => [GraphQLUpload] })
		files: FileUpload[]
	): Promise<ForumReturnType> {
		return this.forumService.createForum(
			user.id,
			universityId,
			data,
			files
		);
	}

	@Scopes('update:forum')
	@Mutation(() => ForumObject)
	updateForum(
		@User() user: UserType,
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: UpdateForumInput,
		@Args('newFiles', { type: () => [GraphQLUpload] })
		newFiles: FileUpload[]
	): Promise<ForumReturnType> {
		return this.forumService.updateForum(
			user.id,
			universityId,
			id,
			data,
			newFiles
		);
	}

	@ResolveField()
	universityUser(
		@Parent() forum: ForumReturnType
	): Promise<UniversityUserReturnType> {
		try {
			return this.universityUserLoader.byId.load(forum.universityUserId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
