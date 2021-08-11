import { ObjectType, OmitType } from '@nestjs/graphql';
import { UserQuestionAnswer } from 'src/generated/prisma-nestjs-graphql/user-question-answer/user-question-answer.model';

@ObjectType()
export class UserQuestionAnswerObject extends OmitType(UserQuestionAnswer, [
	'userQuizQuestion',
	'questionAnswer'
] as const) {}
