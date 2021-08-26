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
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CreateForumCommentInput } from '../dto/create-forum-comment.input';
import { ForumCommentObject } from '../dto/forum-comment.object';
import { ForumService } from '../forum.service';
import { ForumCommentReturnType } from '../forum.types';
import { UniversityUserLoader } from '../../university-user/university-user.loader';
import { UniversityUserReturnType } from 'src/university-user/university-user.types';

@Resolver(() => ForumCommentObject)
export class ForumCommentResolver {
	constructor(
		private readonly forumService: ForumService,
		private readonly universityUserLoader: UniversityUserLoader
	) {}

	@Scopes('read:forum-comments')
	@Query(() => [ForumCommentObject])
	forumComments(
		@Args('forumId') forumId: string
	): Promise<ForumCommentReturnType[]> {
		return this.forumService.getForumComments(forumId);
	}

	@Scopes('create:forum-comment')
	@Mutation(() => ForumCommentObject)
	createForumComment(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Args('forumId') forumId: string,
		@Args('data') data: CreateForumCommentInput
	): Promise<ForumCommentReturnType> {
		return this.forumService.createForumComment(
			universityId,
			user.id,
			forumId,
			data
		);
	}

	@ResolveField()
	universityUser(
		@Parent() forumComment: ForumCommentReturnType
	): Promise<UniversityUserReturnType> {
		try {
			return this.universityUserLoader.byId.load(
				forumComment.universityUserId
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
