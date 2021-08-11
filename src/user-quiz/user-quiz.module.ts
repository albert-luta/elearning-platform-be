import { Module } from '@nestjs/common';
import { UserQuizService } from './user-quiz.service';
import { UserQuizResolver } from './user-quiz.resolver';
import { UserQuizQuestionLoader } from './loaders/user-quiz-question.loader';
import { UserQuizQuestionResolver } from './resolvers/user-quiz-question.resolver';
import { UserQuestionAnswerLoader } from './loaders/user-question-answer.loader';
import { QuestionModule } from 'src/question/question.module';

@Module({
	providers: [
		UserQuizResolver,
		UserQuizService,
		UserQuizQuestionLoader,
		UserQuizQuestionResolver,
		UserQuestionAnswerLoader
	],
	imports: [QuestionModule]
})
export class UserQuizModule {}
