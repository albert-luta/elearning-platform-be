import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseActivityInput } from './base-activity.input';

@InputType()
export class CreateAssignmentInput extends BaseActivityInput {
	@Field()
	@IsNotEmpty()
	@IsDate()
	deadline: Date;

	@Field()
	@IsNotEmpty()
	@IsNumber()
	points: number;
}
