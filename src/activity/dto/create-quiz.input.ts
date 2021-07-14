import { InputType } from '@nestjs/graphql';
import { CreateBaseActivityInput } from './create-base-activity.input';

@InputType()
export class CreateQuizInput extends CreateBaseActivityInput {}
