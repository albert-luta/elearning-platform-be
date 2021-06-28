import { Module } from '@nestjs/common';
import { PrismaGlobalModule } from './global/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './general/error-handling/filters/all-exceptions.filter';
import { UserModule } from './user/user.module';
import { JwtGlobalModule } from './global/jwt/jwt.module';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { UniversityModule } from './university/university.module';
import { ConfigGlobalModule } from './global/config/config.module';
import { MyGraphQLModule } from './my-graphql/my-graphql.module';
import { FileGlobalModule } from './global/file/file.module';
import { MyServeStaticModule } from './my-serve-static/my-serve-static.module';
import { CollegeModule } from './college/college.module';
import { AuthorizationGuard } from './auth/guards/authorization.guard';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { ActivityModule } from './activity/activity.module';

@Module({
	imports: [
		MyGraphQLModule,
		MyServeStaticModule,
		ConfigGlobalModule,
		PrismaGlobalModule,
		JwtGlobalModule,
		FileGlobalModule,
		AuthModule,
		UserModule,
		UniversityModule,
		CollegeModule,
		CourseModule,
		SectionModule,
		ActivityModule
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter
		},
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard
		},
		{
			provide: APP_GUARD,
			useClass: AuthorizationGuard
		}
	]
})
export class AppModule {}
