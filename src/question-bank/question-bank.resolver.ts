import { InternalServerErrorException } from '@nestjs/common';
import {
	Resolver,
	Query,
	ResolveField,
	Parent,
	Args,
	Mutation
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { CreateQuestionCategoryInput } from './dto/create-question-category.input';
import { QuestionCategoryObject } from './dto/question-category.object';
import { UpdateQuestionCategoryInput } from './dto/update-question-category.input';
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

	@Scopes('create:question-category')
	@Mutation(() => QuestionCategoryObject)
	createQuestionCategory(
		@UniversityId() universityId: string,
		@User() user: UserType,
		@Args('data') data: CreateQuestionCategoryInput
	): Promise<QuestionCategoryReturnType> {
		return this.questionBankService.createQuestionCategory(
			universityId,
			user.id,
			data
		);
	}

	@Scopes('update:question-category')
	@Mutation(() => QuestionCategoryObject)
	updateQuestionCategory(
		@Args('id') id: string,
		@Args('data') data: UpdateQuestionCategoryInput
	): Promise<QuestionCategoryReturnType> {
		return this.questionBankService.updateQuestionCategory(id, data);
	}

	@Scopes('delete:question-category')
	@Mutation(() => QuestionCategoryObject)
	deleteQuestionCategory(
		@Args('id') id: string
	): Promise<QuestionCategoryReturnType> {
		return this.questionBankService.deleteQuestionCategory(id);
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
