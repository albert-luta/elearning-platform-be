import { Field, InputType } from '@nestjs/graphql';
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
}
