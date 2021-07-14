import { CreateBaseActivityInput } from './create-base-activity.input';
import { Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@InputType()
export class UpdateBaseActivityInput extends CreateBaseActivityInput {
	@IsArray()
	@Field(() => [String])
	oldFiles: string[];

	@IsArray()
	@Field(() => [String])
	filesToDelete: string[];
}
