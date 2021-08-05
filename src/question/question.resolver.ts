import { QuestionService } from './question.service';
import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { QuestionType } from 'src/generated/prisma-nestjs-graphql/prisma/question-type.enum';
import { QuestionAnswerLoader } from './loaders/question-answer.loader';
import { QuestionObject } from './dto/question.object';
import { QuestionReturnType } from 'src/question-bank/question-bank.types';
import { QuestionAnswerObject } from './dto/question-answer.object';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => QuestionObject)
export class QuestionResolver {
	constructor(
		private readonly questionService: QuestionService,
		private readonly questionAnswerLoader: QuestionAnswerLoader
	) {}

	@Scopes('create:question')
	@Mutation(() => QuestionObject)
	createQuestion(
		@Args('questionCategoryId') questionCategoryId: string,
		@Args('data') data: CreateQuestionInput
	): Promise<QuestionReturnType> {
		return this.questionService.createQuestion(questionCategoryId, data);
	}

	@Scopes('update:question')
	@Mutation(() => QuestionObject)
	updateQuestion(
		@Args('id') id: string,
		@Args('data') data: UpdateQuestionInput
	): Promise<QuestionReturnType> {
		return this.questionService.updateQuestion(id, data);
	}

	@Scopes('delete:question')
	@Mutation(() => QuestionObject)
	deleteQuestion(@Args('id') id: string): Promise<QuestionReturnType> {
		return this.questionService.deleteQuestion(id);
	}

	@ResolveField()
	answers(
		@Parent() question: QuestionReturnType
	): Promise<QuestionAnswerObject[]> {
		try {
			return question.type === QuestionType.NUMERICAL
				? Promise.resolve([])
				: this.questionAnswerLoader.byQuestionId.load(question.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
