import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class UpdateMyAssignmentInput {
	@IsArray()
	@Field(() => [String])
	oldFiles: string[];

	@IsArray()
	@Field(() => [String])
	filesToDelete: string[];
}
