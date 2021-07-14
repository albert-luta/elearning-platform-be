import { InputType } from '@nestjs/graphql';
import { CreateBaseActivityInput } from './create-base-activity.input';

@InputType()
export class CreateResourceInput extends CreateBaseActivityInput {}
