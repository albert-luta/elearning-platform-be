import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { QuizQuestionReturnType } from '../activity.types';

@Injectable({ scope: Scope.REQUEST })
export class QuizQuestionLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byQuizId = new DataLoader<string, QuizQuestionReturnType[]>(
		async (ids) => {
			const quizQuestions = await this.prisma.quizQuestion.findMany({
				where: {
					quizId: {
						in: [...ids]
					}
				}
			});
			const quizQuestionsMap = quizQuestions.reduce<
				Record<string, QuizQuestionReturnType[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.quizId]: [...(acc[curr.quizId] ?? []), curr]
				}),
				{}
			);

			return ids.map((id) => quizQuestionsMap[id] ?? []);
		}
	);
}
