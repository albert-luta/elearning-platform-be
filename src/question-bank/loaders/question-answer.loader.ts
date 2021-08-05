import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { QuestionAnswerObject } from '../dto/question-answer.object';

@Injectable({ scope: Scope.REQUEST })
export class QuestionAnswerLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byQuestionId = new DataLoader<string, QuestionAnswerObject[]>(
		async (ids) => {
			const questionAnswers = await this.prisma.questionAnswer.findMany({
				where: {
					questionId: {
						in: [...ids]
					}
				}
			});
			const questionAnswersMap = questionAnswers.reduce<
				Record<string, QuestionAnswerObject[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.questionId]: [...(acc[curr.questionId] ?? []), curr]
				}),
				{}
			);

			return ids.map((id) => questionAnswersMap[id] ?? []);
		}
	);
}
