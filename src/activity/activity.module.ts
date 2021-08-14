import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { ActivityLoader } from './activity.loader';
import { UserModule } from 'src/user/user.module';
import { ActivityUtilsService } from './services/activity-utils.service';
import { QuizResolver } from './resolvers/quiz.resolver';
import { QuizQuestionResolver } from './resolvers/quiz-question.resolver';
import { QuizQuestionLoader } from './loaders/quiz-question.loader';
import { QuestionModule } from 'src/question/question.module';
import { CollegeModule } from 'src/college/college.module';
import { CourseModule } from 'src/course/course.module';

@Module({
	providers: [
		ActivityResolver,
		ActivityService,
		ActivityLoader,
		ActivityUtilsService,
		QuizResolver,
		QuizQuestionResolver,
		QuizQuestionLoader
	],
	imports: [UserModule, QuestionModule, CollegeModule, CourseModule],
	exports: [ActivityLoader, ActivityUtilsService]
})
export class ActivityModule {}
