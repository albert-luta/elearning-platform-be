import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CourseToEnrollAtInput {
	@Field()
	@IsNotEmpty()
	id: string;
}
