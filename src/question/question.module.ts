import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionLoader } from './question.loader';
import { QuestionAnswerLoader } from './loaders/question-answer.loader';

@Module({
	providers: [
		QuestionResolver,
		QuestionService,
		QuestionLoader,
		QuestionAnswerLoader
	],
	exports: [QuestionLoader]
})
export class QuestionModule {}
