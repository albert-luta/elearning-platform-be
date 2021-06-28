import { InputType } from '@nestjs/graphql';
import { BaseActivityInput } from './base-activity.input';

@InputType()
export class CreateAssignmentInput extends BaseActivityInput {}
