import { Module } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service';
import { QuestionBankResolver } from './question-bank.resolver';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionLoader } from './loaders/question.loader';
import { QuestionAnswerLoader } from './loaders/question-answer.loader';

@Module({
	providers: [
		QuestionBankResolver,
		QuestionBankService,
		QuestionResolver,
		QuestionLoader,
		QuestionAnswerLoader
	]
})
export class QuestionBankModule {}
