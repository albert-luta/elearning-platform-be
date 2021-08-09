import {
	Field,
	// Int,
	// IntersectionType,
	ObjectType,
	OmitType
} from '@nestjs/graphql';
import { QuizQuestion } from 'src/generated/prisma-nestjs-graphql/quiz-question/quiz-question.model';
import { QuestionObject } from 'src/question/dto/question.object';

// @ObjectType()
// export class QuizQuestionObject extends IntersectionType(
// 	QuestionObject,
// 	OmitType(QuizQuestion, ['id', 'quiz', 'question'] as const)
// ) {}

@ObjectType()
export class QuizQuestionObject extends OmitType(QuizQuestion, [
	'quiz',
	'question'
] as const) {
	@Field(() => QuestionObject)
	question: QuestionObject;
}

// @ObjectType()
// export class QuizQuestionObject extends QuestionObject {
// 	@Field()
// 	quizId: string;

// 	@Field()
// 	questionId: string;

// 	@Field()
// 	maxGrade: number;

// 	@Field(() => Int)
// 	order: number;
// }
