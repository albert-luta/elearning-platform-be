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
import { UserAssignmentModule } from './user-assignment/user-assignment.module';
import { QuestionBankModule } from './question-bank/question-bank.module';
import { QuestionModule } from './question/question.module';
import { UserQuizModule } from './user-quiz/user-quiz.module';

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
		ActivityModule,
		UserAssignmentModule,
		QuestionBankModule,
		QuestionModule,
		UserQuizModule
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
