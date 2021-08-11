import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { QuizQuestion } from 'src/generated/prisma-nestjs-graphql/quiz-question/quiz-question.model';
import { QuestionObject } from 'src/question/dto/question.object';

@ObjectType()
export class QuizQuestionObject extends OmitType(QuizQuestion, [
	'quiz',
	'question',
	'userQuizQuestions'
] as const) {
	@Field(() => QuestionObject)
	question: QuestionObject;
}
