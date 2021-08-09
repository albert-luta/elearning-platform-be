import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateQuizQuestionInput {
	@Field()
	@IsNotEmpty()
	questionId: string;

	@Field()
	@Min(0)
	maxGrade: number;

	@Field(() => Int)
	@Min(0)
	order: number;
}
