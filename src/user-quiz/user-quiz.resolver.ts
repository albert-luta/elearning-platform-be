import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { User } from 'src/user/decorators/user.decorator';
import { UserQuizObject } from './dto/user-quiz.object';
import { UserQuizQuestionLoader } from './loaders/user-quiz-question.loader';
import { UserQuizService } from './user-quiz.service';
import {
	UserQuizQuestionReturnType,
	UserQuizReturnType
} from './user-quiz.types';

@Resolver(() => UserQuizObject)
export class UserQuizResolver {
	constructor(
		private readonly userQuizService: UserQuizService,
		private readonly userQuizQuestionLoader: UserQuizQuestionLoader
	) {}

	@Scopes('read:my-quiz-attempt')
	@Query(() => UserQuizObject, { nullable: true })
	myQuiz(
		@User() user: UserType,
		@Args('quizId') quizId: string
	): Promise<UserQuizReturnType | null> {
		return this.userQuizService.getMyQuiz(user.id, quizId);
	}

	@Scopes('create:my-quiz-attempt')
	@Mutation(() => UserQuizObject)
	createQuizAttempt(
		@User() user: UserType,
		@Args('quizId') quizId: string
	): Promise<UserQuizReturnType> {
		return this.userQuizService.createQuizAttempt(user.id, quizId);
	}

	@ResolveField()
	questions(
		@Parent() userQuiz: UserQuizReturnType
	): Promise<UserQuizQuestionReturnType[]> {
		try {
			return this.userQuizQuestionLoader.byUserQuizId.load(userQuiz.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
