import { Module } from '@nestjs/common';
import { UserAssignmentService } from './user-assignment.service';
import { UserAssignmentResolver } from './user-assignment.resolver';
import { UserModule } from 'src/user/user.module';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
	providers: [UserAssignmentResolver, UserAssignmentService],
	imports: [UserModule, ActivityModule]
})
export class UserAssignmentModule {}
