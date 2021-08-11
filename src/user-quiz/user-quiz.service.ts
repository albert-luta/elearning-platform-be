import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserQuizReturnType } from './user-quiz.types';

@Injectable()
export class UserQuizService {
	constructor(private readonly prisma: PrismaService) {}

	async getMyQuiz(
		userId: string,
		quizId: string
	): Promise<UserQuizReturnType | null> {
		try {
			const myQuiz = await this.prisma.userQuiz.findUnique({
				where: {
					userId_quizId: {
						userId,
						quizId
					}
				}
			});

			return myQuiz;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createQuizAttempt(
		userId: string,
		quizId: string
	): Promise<UserQuizReturnType> {
		try {
			const quizQuestions = await this.prisma.quizQuestion.findMany({
				where: {
					quizId
				}
			});
			const quizAttempt = await this.prisma.userQuiz.create({
				data: {
					userId,
					quizId,
					timeStart: new Date(),
					userQuizQuestions: {
						createMany: {
							data: quizQuestions.map(({ id }) => ({
								quizQuestionId: id
							}))
						}
					}
				}
			});

			return quizAttempt;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
