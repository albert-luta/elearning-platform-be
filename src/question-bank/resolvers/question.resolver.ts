import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { QuestionAnswerObject } from '../dto/question-answer.object';
import { QuestionObject } from '../dto/question.object';
import { QuestionAnswerLoader } from '../loaders/question-answer.loader';
import { QuestionReturnType } from '../question-bank.types';

@Resolver(() => QuestionObject)
export class QuestionResolver {
	constructor(private readonly questionAnswerLoader: QuestionAnswerLoader) {}

	@ResolveField()
	answers(
		@Parent() question: QuestionReturnType
	): Promise<QuestionAnswerObject[]> {
		try {
			return this.questionAnswerLoader.byQuestionId.load(question.id);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
