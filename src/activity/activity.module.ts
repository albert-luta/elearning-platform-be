import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { ActivityLoader } from './activity.loader';

@Module({
	providers: [ActivityResolver, ActivityService, ActivityLoader],
	exports: [ActivityLoader]
})
export class ActivityModule {}
