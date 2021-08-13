import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumResolver } from './forum.resolver';
import { UniversityUserResolver } from './resolvers/university-user.resolver';
import { UniversityUserLoader } from './loaders/university-user.loader';
import { RoleLoader } from './loaders/role.loader';
import { UserModule } from 'src/user/user.module';

@Module({
	providers: [
		ForumResolver,
		ForumService,
		UniversityUserResolver,
		UniversityUserLoader,
		RoleLoader
	],
	imports: [UserModule]
})
export class ForumModule {}
