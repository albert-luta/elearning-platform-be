import { Module } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service';
import { QuestionBankResolver } from './question-bank.resolver';
import { QuestionModule } from 'src/question/question.module';

@Module({
	providers: [QuestionBankResolver, QuestionBankService],
	imports: [QuestionModule]
})
export class QuestionBankModule {}
