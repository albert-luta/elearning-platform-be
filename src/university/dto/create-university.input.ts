import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUniversityInput {
	@Field()
	@IsNotEmpty()
	name: string;
}
