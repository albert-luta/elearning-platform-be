import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, Min, MinDate } from 'class-validator';
import { CreateBaseActivityInput } from './create-base-activity.input';

@InputType()
export class CreateAssignmentInput extends CreateBaseActivityInput {
	@Field()
	@IsNotEmpty()
	@IsDate()
	@MinDate(new Date())
	deadline: Date;

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	maxGrade: number;
}
