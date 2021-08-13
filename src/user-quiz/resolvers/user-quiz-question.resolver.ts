import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { QuestionReturnType } from 'src/question-bank/question-bank.types';
import { QuestionLoader } from 'src/question/question.loader';
import { UserQuestionAnswerObject } from '../dto/user-question-answer';
import { UserQuizQuestionObject } from '../dto/user-quiz-question.object';
import { UserQuestionAnswerLoader } from '../loaders/user-question-answer.loader';
import { UserQuizService } from '../user-quiz.service';
import { UserQuizQuestionReturnType } from '../user-quiz.types';

@Resolver(() => UserQuizQuestionObject)
export class UserQuizQuestionResolver {
	constructor(
		private readonly questionLoader: QuestionLoader,
		private readonly userQuestionAnswerLoader: UserQuestionAnswerLoader,
		private readonly userQuizService: UserQuizService
	) {}

	@Scopes('update:question-answers')
	@Mutation(() => UserQuizQuestionObject)
	updateQuestionAnswers(
		@Args('userQuizQuestionId') userQuizQuestionId: string,
		@Args('answers', { type: () => [String] }) answers: string[]
	): Promise<UserQuizQuestionReturnType> {
		return this.userQuizService.updateQuestionAnswers(
			userQuizQuestionId,
			answers
		);
	}

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
