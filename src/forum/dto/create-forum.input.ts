import { InputType } from '@nestjs/graphql';
import { CreateBaseActivityInput } from 'src/activity/dto/create-base-activity.input';

@InputType()
export class CreateForumInput extends CreateBaseActivityInput {}
