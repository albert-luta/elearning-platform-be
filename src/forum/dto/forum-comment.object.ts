import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { ForumComment } from 'src/generated/prisma-nestjs-graphql/forum-comment/forum-comment.model';
import { UniversityUserObject } from './university-user.object';

@ObjectType()
export class ForumCommentObject extends OmitType(ForumComment, [
	'forum',
	'universityUser'
] as const) {
	@Field(() => UniversityUserObject)
	universityUser: UniversityUserObject;
}
