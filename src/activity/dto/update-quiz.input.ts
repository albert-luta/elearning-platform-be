import { InputType /* , IntersectionType */ } from '@nestjs/graphql';
// import { CreateQuizInput } from './create-quiz.input';
import { UpdateBaseActivityInput } from './update-base-activity.input';

// @InputType()
// export class UpdateQuizInput extends IntersectionType(
// 	UpdateBaseActivityInput,
// 	CreateQuizInput
// ) {}

@InputType()
export class UpdateQuizInput extends UpdateBaseActivityInput {}
