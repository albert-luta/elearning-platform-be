import { InternalServerErrorException } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { QuestionCategoryObject } from './dto/question-category.object';
import { QuestionLoader } from './loaders/question.loader';
import { QuestionBankService } from './question-bank.service';
import {
	QuestionCategoryReturnType,
	QuestionReturnType
} from './question-bank.types';

@Resolver(() => QuestionCategoryObject)
export class QuestionBankResolver {
	constructor(
		private readonly questionBankService: QuestionBankService,
		private readonly questionLoader: QuestionLoader
	) {}

	@Scopes('read:question-bank')
	@Query(() => [QuestionCategoryObject])
	questionBank(
		@UniversityId() universityId: string,
		@User() user: UserType
	): Promise<QuestionCategoryReturnType[]> {
		return this.questionBankService.getQuestionBank(universityId, user.id);
	}

	@ResolveField()
	questions(
		@Parent() category: QuestionCategoryReturnType
	): Promise<QuestionReturnType[]> {
		try {
			return this.questionLoader.byCategoryId.load(category.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
