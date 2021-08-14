import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { UniversityUserResolver } from './resolvers/university-user.resolver';
import { UniversityUserLoader } from './loaders/university-user.loader';
import { RoleLoader } from './loaders/role.loader';
import { UserModule } from 'src/user/user.module';
import { ActivityModule } from 'src/activity/activity.module';
import { ForumCommentResolver } from './resolvers/forum-comment.resolver';

@Module({
	providers: [
		ForumResolver,
		ForumService,
		UniversityUserResolver,
		ForumCommentResolver,
		UniversityUserLoader,
		RoleLoader
	],
	imports: [UserModule, ActivityModule]
})
export class ForumModule {}
