import { ObjectType, OmitType } from '@nestjs/graphql';
import { QuestionAnswer } from 'src/generated/prisma-nestjs-graphql/question-answer/question-answer.model';

@ObjectType()
export class QuestionAnswerObject extends OmitType(QuestionAnswer, [
	'question',
	'questionId',
	'fraction'
] as const) {}
