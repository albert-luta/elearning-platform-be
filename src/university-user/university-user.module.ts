import { Module } from '@nestjs/common';
import { UniversityUserService } from './university-user.service';
import { UniversityUserResolver } from './university-user.resolver';
import { UserModule } from 'src/user/user.module';
import { UniversityUserLoader } from './university-user.loader';
import { RoleLoader } from './loaders/role.loader';
import { CollegeUserLoader } from './loaders/college-user.loader';
import { CollegeModule } from 'src/college/college.module';
import { CollegeUserResolver } from './resolvers/college-user.resolver';
import { CourseUserLoader } from './loaders/course-user.loader';
import { CourseModule } from 'src/course/course.module';
import { CourseUserResolver } from './resolvers/course-user.resolver';
import { RoleResolver } from './resolvers/role.resolver';

@Module({
	providers: [
		UniversityUserResolver,
		UniversityUserService,
		UniversityUserLoader,
		RoleLoader,
		CollegeUserLoader,
		CollegeUserResolver,
		CourseUserLoader,
		CourseUserResolver,
		RoleResolver
	],
	exports: [UniversityUserLoader],
	imports: [UserModule, CollegeModule, CourseModule]
})
export class UniversityUserModule {}
