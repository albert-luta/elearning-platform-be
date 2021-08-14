import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateForumCommentInput {
	@Field()
	@IsNotEmpty()
	text: string;
}
