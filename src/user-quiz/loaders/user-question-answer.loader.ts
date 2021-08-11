import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserQuestionAnswerObject } from '../dto/user-question-answer';

@Injectable({ scope: Scope.REQUEST })
export class UserQuestionAnswerLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byUserQuizQuestionId = new DataLoader<
		string,
		UserQuestionAnswerObject[]
	>(async (ids) => {
		const userQuestionAnswers = await this.prisma.userQuestionAnswer.findMany(
			{
				where: {
					userQuizQuestionId: {
						in: [...ids]
					}
				}
			}
		);
		const userQuestionAnswersMap = userQuestionAnswers.reduce<
			Record<string, UserQuestionAnswerObject[]>
		>(
			(acc, curr) => ({
				...acc,
				[curr.userQuizQuestionId]: [
					...(acc[curr.userQuizQuestionId] ?? []),
					curr
				]
			}),
			{}
		);

		return ids.map((id) => userQuestionAnswersMap[id] ?? []);
	});
}
