import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserQuizQuestion } from 'src/generated/prisma-nestjs-graphql/user-quiz-question/user-quiz-question.model';
import { QuestionObject } from 'src/question/dto/question.object';
import { UserQuestionAnswerObject } from './user-question-answer';

@ObjectType()
export class UserQuizQuestionObject extends OmitType(UserQuizQuestion, [
	'userQuiz',
	'quizQuestion',
	'userQuestionAnswers'
] as const) {
	@Field(() => QuestionObject)
	question: QuestionObject;

	@Field(() => [UserQuestionAnswerObject])
	pickedAnswers: UserQuestionAnswerObject[];
}
