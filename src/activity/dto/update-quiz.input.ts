import { Field, InputType /* , IntersectionType */ } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { CreateQuizInput } from './create-quiz.input';
// import { UpdateBaseActivityInput } from './update-base-activity.input';

// @InputType()
// export class UpdateQuizInput extends IntersectionType(
// 	UpdateBaseActivityInput,
// 	CreateQuizInput
// ) {}

@InputType()
export class UpdateQuizInput extends CreateQuizInput {
	@Field(() => [String])
	@IsArray()
	oldFiles: string[];

	@Field(() => [String])
	@IsArray()
	filesToDelete: string[];
}
