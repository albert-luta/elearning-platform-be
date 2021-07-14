import { InputType /* , IntersectionType */ } from '@nestjs/graphql';
// import { CreateResourceInput } from './create-resource.input';
import { UpdateBaseActivityInput } from './update-base-activity.input';

// @InputType()
// export class UpdateResourceInput extends IntersectionType(
// 	UpdateBaseActivityInput,
// 	CreateResourceInput
// ) {}

@InputType()
export class UpdateResourceInput extends UpdateBaseActivityInput {}
