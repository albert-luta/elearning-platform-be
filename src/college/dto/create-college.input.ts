import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCollegeInput {
	@Field()
	@IsNotEmpty()
	name: string;
}
