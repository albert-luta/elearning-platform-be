import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionReturnType } from 'src/question-bank/question-bank.types';
import { QuestionLoader } from 'src/question/question.loader';
import { UserQuestionAnswerObject } from '../dto/user-question-answer';
import { UserQuizQuestionObject } from '../dto/user-quiz-question.object';
import { UserQuestionAnswerLoader } from '../loaders/user-question-answer.loader';
import { UserQuizQuestionReturnType } from '../user-quiz.types';

@Resolver(() => UserQuizQuestionObject)
export class UserQuizQuestionResolver {
	constructor(
		private readonly questionLoader: QuestionLoader,
		private readonly userQuestionAnswerLoader: UserQuestionAnswerLoader
	) {}

	@ResolveField()
	question(
		@Parent() userQuizQuestion: UserQuizQuestionReturnType
	): Promise<QuestionReturnType> {
		try {
			return this.questionLoader.byQuizQuestionId.load(
				userQuizQuestion.quizQuestionId
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	@ResolveField()
	pickedAnswers(
		@Parent() userQuizQuestion: UserQuizQuestionReturnType
	): Promise<UserQuestionAnswerObject[]> {
		try {
			return this.userQuestionAnswerLoader.byUserQuizQuestionId.load(
				userQuizQuestion.id
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
