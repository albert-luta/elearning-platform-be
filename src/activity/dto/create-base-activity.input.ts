import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBaseActivityInput {
	@Field()
	@IsNotEmpty()
	sectionId: string;

	@Field()
	@IsNotEmpty()
	name: string;

	@Field()
	description: string;
}
