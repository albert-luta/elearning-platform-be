import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserQuiz } from 'src/generated/prisma-nestjs-graphql/user-quiz/user-quiz.model';
import { UserQuizQuestionObject } from './user-quiz-question.object';

@ObjectType()
export class UserQuizObject extends OmitType(UserQuiz, [
	'user',
	'quiz',
	'userQuizQuestions'
] as const) {
	@Field(() => [UserQuizQuestionObject])
	questions: UserQuizQuestionObject[];
}
