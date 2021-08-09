import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuizQuestionReturnType, QuizReturnType } from '../activity.types';
import { QuizObject } from '../dto/quiz.object';
import { QuizQuestionLoader } from '../loaders/quiz-question.loader';

@Resolver(() => QuizObject)
export class QuizResolver {
	constructor(private readonly quizQuestionLoader: QuizQuestionLoader) {}

	@ResolveField()
	quizQuestions(
		@Parent() quiz: QuizReturnType
	): Promise<QuizQuestionReturnType[]> {
		try {
			return this.quizQuestionLoader.byQuizId.load(quiz.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
