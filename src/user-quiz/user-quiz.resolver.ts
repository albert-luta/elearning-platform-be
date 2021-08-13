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
import { UserReturnType } from 'src/user/user.types';
import { SubmitMyQuizInput } from './dto/submit-my-quiz.input';
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

	@Scopes('read:user-quiz-attempt')
	@Query(() => UserQuizObject)
	userQuizAttempt(
		@Args('userId') userId: string,
		@Args('quizId') quizId: string
	): Promise<UserQuizReturnType> {
		return this.userQuizService.getUserQuizAttempt(userId, quizId);
	}

	@Scopes('read:user-quiz-attempts')
	@Query(() => [UserQuizObject])
	userQuizAttempts(
		@Args('quizId') quizId: string
	): Promise<UserQuizReturnType[]> {
		return this.userQuizService.getUserQuizAttempts(quizId);
	}

	@Scopes('update:submit-my-quiz')
	@Mutation(() => UserQuizObject)
	submitMyQuiz(
		@Args('id') id: string,
		@Args('data') data: SubmitMyQuizInput
	): Promise<UserQuizReturnType> {
		return this.userQuizService.submitMyQuiz(id, data);
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

	@ResolveField()
	user(@Parent() userQuiz: UserQuizReturnType): Promise<UserReturnType> {
		return this.userQuizService.getUser(userQuiz.userId);
	}
}
