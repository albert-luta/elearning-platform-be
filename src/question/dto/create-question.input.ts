import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { QuestionType } from 'src/generated/prisma-nestjs-graphql/prisma/question-type.enum';
import { CreateAnswerInput } from './create-answer.input';

@InputType()
export class CreateQuestionInput {
	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsNotEmpty()
	text: string;

	@Field(() => QuestionType)
	type: QuestionType;

	@Field(() => [CreateAnswerInput])
	answers: CreateAnswerInput[];
}
