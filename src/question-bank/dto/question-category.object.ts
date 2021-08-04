import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { QuestionCategory } from 'src/generated/prisma-nestjs-graphql/question-category/question-category.model';
import { QuestionObject } from './question.object';

@ObjectType()
export class QuestionCategoryObject extends OmitType(QuestionCategory, [
	'questions',
	'universityUser',
	'universityUserId'
] as const) {
	@Field(() => [QuestionObject])
	questions: QuestionObject[];
}
