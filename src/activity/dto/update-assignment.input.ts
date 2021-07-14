import { Field, InputType /* , IntersectionType */ } from '@nestjs/graphql';
// import { CreateAssignmentInput } from './create-assignment.input';
import { UpdateBaseActivityInput } from './update-base-activity.input';
import { IsDate, IsNotEmpty, IsNumber, Min, MinDate } from 'class-validator';

// @InputType()
// export class UpdateAssignmentInput extends IntersectionType(
// 	UpdateBaseActivityInput,
// 	CreateAssignmentInput
// ) {}

@InputType()
export class UpdateAssignmentInput extends UpdateBaseActivityInput {
	@Field()
	@IsNotEmpty()
	@IsDate()
	@MinDate(new Date())
	deadline: Date;

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	points: number;
}
