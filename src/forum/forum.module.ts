import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { UserModule } from 'src/user/user.module';
import { ActivityModule } from 'src/activity/activity.module';
import { ForumCommentResolver } from './resolvers/forum-comment.resolver';
import { UniversityUserModule } from 'src/university-user/university-user.module';

@Module({
	providers: [ForumResolver, ForumService, ForumCommentResolver],
	imports: [UserModule, ActivityModule, UniversityUserModule]
})
export class ForumModule {}
