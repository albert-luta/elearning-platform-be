import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ForumObject } from 'src/forum/dto/forum.object';
import { UniversityUserLoader } from 'src/forum/loaders/university-user.loader';
import { ForumReturnType, UniversityUserReturnType } from './forum.types';
// import { ForumService } from './forum.service';

@Resolver(() => ForumObject)
export class ForumResolver {
	constructor(
		// private readonly forumService: ForumService,
		private readonly universityUserLoader: UniversityUserLoader
	) {}

	// createForum
	// updateForum

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
