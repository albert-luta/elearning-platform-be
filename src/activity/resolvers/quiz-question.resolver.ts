import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionReturnType } from 'src/question-bank/question-bank.types';
import { QuestionLoader } from 'src/question/question.loader';
import { QuizQuestionReturnType } from '../activity.types';
import { QuizQuestionObject } from '../dto/quiz-question.object';

@Resolver(() => QuizQuestionObject)
export class QuizQuestionResolver {
	constructor(private readonly questionLoader: QuestionLoader) {}

	@ResolveField()
	question(
		@Parent() quizQuestion: QuizQuestionReturnType
	): Promise<QuestionReturnType> {
		try {
			return this.questionLoader.byId.load(quizQuestion.questionId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
