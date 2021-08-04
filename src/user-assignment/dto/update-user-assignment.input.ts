import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateUserAssignmentInput {
	@Field()
	@IsNotEmpty()
	@IsDate()
	updatedAt: Date;

	@Field(() => Float, { nullable: true })
	@IsOptional()
	@IsNumber()
	@Min(0)
	grade: number | null;
}
