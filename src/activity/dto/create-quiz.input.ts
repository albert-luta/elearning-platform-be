import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, Min, MinDate } from 'class-validator';
import { CreateBaseActivityInput } from './create-base-activity.input';
import { CreateQuizQuestionInput } from './create-quiz-question.input';

@InputType()
export class CreateQuizInput extends CreateBaseActivityInput {
	@Field()
	visible: boolean;

	@Field()
	shuffleQuestions: boolean;

	@Field()
	shuffleAnswers: boolean;

	@Field()
	@IsNotEmpty()
	@IsDate()
	@MinDate(new Date())
	timeOpen: Date;

	@Field()
	@IsNotEmpty()
	@IsDate()
	@MinDate(new Date())
	timeClose: Date;

	@Field(() => Int)
	@Min(0)
	timeLimit: number;

	@Field(() => [CreateQuizQuestionInput])
	questions: CreateQuizQuestionInput[];
}
