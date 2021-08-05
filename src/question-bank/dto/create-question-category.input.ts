import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionCategoryInput {
	@Field()
	@IsNotEmpty()
	name: string;
}
