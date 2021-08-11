import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { QuestionType } from 'src/generated/prisma-nestjs-graphql/prisma/question-type.enum';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { QuestionReturnType } from '../question-bank/question-bank.types';

@Injectable({ scope: Scope.REQUEST })
export class QuestionLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byCategoryId = new DataLoader<string, QuestionReturnType[]>(
		async (ids) => {
			const questions = await this.prisma.question.findMany({
				where: {
					questionCategoryId: {
						in: [...ids]
					}
				},
				orderBy: {
					createdAt: 'asc'
				}
			});
			const questionsMap = questions.reduce<
				Record<string, QuestionReturnType[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.questionCategoryId]: [
						...(acc[curr.questionCategoryId] ?? []),
						{
							...curr,
							type: curr.type as QuestionType
						}
					]
				}),
				{}
			);

			return ids.map((id) => questionsMap[id] ?? []);
		}
	);

	readonly byId = new DataLoader<string, QuestionReturnType>(async (ids) => {
		const questions = await this.prisma.question.findMany({
			where: {
				id: {
					in: [...ids]
				}
			},
			orderBy: {
				createdAt: 'asc'
			}
		});
		const questionsMap = questions.reduce<
			Record<string, QuestionReturnType>
		>(
			(acc, curr) => ({
				...acc,
				[curr.id]: { ...curr, type: curr.type as QuestionType }
			}),
			{}
		);

		return ids.map((id) => questionsMap[id]);
	});

	readonly byQuizQuestionId = new DataLoader<string, QuestionReturnType>(
		async (ids) => {
			const quizQuestions = await this.prisma.quizQuestion.findMany({
				where: {
					id: {
						in: [...ids]
					}
				},
				include: {
					question: true
				}
			});
			const quizQuestionsMap = quizQuestions.reduce<
				Record<string, QuestionReturnType>
			>(
				(acc, { id, question }) => ({
					...acc,
					[id]: { ...question, type: question.type as QuestionType }
				}),
				{}
			);

			return ids.map((id) => quizQuestionsMap[id]);
		}
	);
}
