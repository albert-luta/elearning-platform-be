import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { ActivityLoader } from './activity.loader';
import { UserModule } from 'src/user/user.module';
import { ActivityUtilsService } from './services/activity-utils.service';

@Module({
	providers: [
		ActivityResolver,
		ActivityService,
		ActivityLoader,
		ActivityUtilsService
	],
	imports: [UserModule],
	exports: [ActivityLoader, ActivityUtilsService]
})
export class ActivityModule {}
