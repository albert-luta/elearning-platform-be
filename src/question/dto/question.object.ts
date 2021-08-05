import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Question } from 'src/generated/prisma-nestjs-graphql/question/question.model';
import { QuestionAnswerObject } from './question-answer.object';

@ObjectType()
export class QuestionObject extends OmitType(Question, [
	'questionAnswers',
	'questionCategory',
	'questionCategoryId',
	'createdAt'
] as const) {
	@Field(() => [QuestionAnswerObject])
	answers: QuestionAnswerObject[];
}
