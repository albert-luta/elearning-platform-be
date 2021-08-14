import { InputType } from '@nestjs/graphql';
import { UpdateBaseActivityInput } from 'src/activity/dto/update-base-activity.input';

@InputType()
export class UpdateForumInput extends UpdateBaseActivityInput {}
