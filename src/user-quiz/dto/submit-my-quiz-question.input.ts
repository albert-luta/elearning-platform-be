import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SubmitMyQuizQuestionInput {
	@Field()
	@IsNotEmpty()
	userQuizQuestionId: string;

	@Field(() => [String])
	@IsNotEmpty({
		each: true
	})
	answers: string[];
}
