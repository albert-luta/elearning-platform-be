import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserQuizQuestionReturnType } from '../user-quiz.types';

@Injectable({ scope: Scope.REQUEST })
export class UserQuizQuestionLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byUserQuizId = new DataLoader<
		string,
		UserQuizQuestionReturnType[]
	>(async (ids) => {
		const userQuizQuestions = await this.prisma.userQuizQuestion.findMany({
			where: {
				userQuizId: {
					in: [...ids]
				}
			}
		});
		const userQuizQuestionsMap = userQuizQuestions.reduce<
			Record<string, UserQuizQuestionReturnType[]>
		>(
			(acc, curr) => ({
				...acc,
				[curr.userQuizId]: [...(acc[curr.userQuizId] ?? []), curr]
			}),
			{}
		);

		return ids.map((id) => userQuizQuestionsMap[id] ?? []);
	});
}
