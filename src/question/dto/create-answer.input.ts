import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class CreateAnswerInput {
	@Field()
	@IsNotEmpty()
	text: string;

	@Field()
	@Min(-1)
	@Max(1)
	fraction: number;

	@Field(() => Int)
	@Min(0)
	order: number;
}
