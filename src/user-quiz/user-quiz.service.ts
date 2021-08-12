import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserLoader } from 'src/user/user.loader';
import { UserReturnType } from 'src/user/user.types';
import { UserQuizReturnType } from './user-quiz.types';

@Injectable()
export class UserQuizService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userLoader: UserLoader,
		private readonly fileService: FileService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

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

	async getUserQuizAttempt(
		userId: string,
		quizId: string
	): Promise<UserQuizReturnType> {
		try {
			const quizAttempt = await this.prisma.userQuiz.findUnique({
				where: {
					userId_quizId: {
						userId,
						quizId
					}
				}
			});
			if (!quizAttempt) {
				throw new Error(this.NOT_FOUND);
			}

			return quizAttempt;
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async getUserQuizAttempts(quizId: string): Promise<UserQuizReturnType[]> {
		try {
			const userQuizAttempts = await this.prisma.userQuiz.findMany({
				where: {
					quizId
				}
			});

			return userQuizAttempts;
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

	async getUser(id: string): Promise<UserReturnType> {
		try {
			const { avatar, ...user } = await this.userLoader.byId.load(id);

			return {
				...user,
				avatar: avatar && this.fileService.getUrlFromDbFilePath(avatar)
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
