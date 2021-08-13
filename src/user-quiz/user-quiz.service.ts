import { Prisma } from '.prisma/client';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { MyBadRequestError } from 'src/general/error-handling/errors/my-bad-request.error';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserLoader } from 'src/user/user.loader';
import { UserReturnType } from 'src/user/user.types';
import { SubmitMyQuizInput } from './dto/submit-my-quiz.input';
import {
	UserQuizQuestionReturnType,
	UserQuizReturnType
} from './user-quiz.types';

@Injectable()
export class UserQuizService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userLoader: UserLoader,
		private readonly fileService: FileService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	private async gradeUserQuiz(id: string): Promise<UserQuizReturnType> {
		const userQuiz = await this.prisma.userQuiz.findUnique({
			where: {
				id
			},
			include: {
				userQuizQuestions: {
					include: {
						userQuestionAnswers: {
							include: {
								questionAnswer: true
							}
						},
						quizQuestion: true
					}
				}
			}
		});
		if (!userQuiz) {
			throw new Error(this.NOT_FOUND);
		}

		await Promise.all(
			userQuiz.userQuizQuestions.map(
				({ id, quizQuestion: { maxGrade }, userQuestionAnswers }) =>
					this.prisma.userQuizQuestion.update({
						where: {
							id
						},
						data: {
							grade:
								maxGrade *
								Math.max(
									0,
									userQuestionAnswers.reduce(
										(acc, curr) =>
											acc + curr.questionAnswer.fraction,
										0
									)
								)
						}
					})
			)
		);

		return userQuiz;
	}

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

	async updateQuestionAnswers(
		userQuizQuestionId: string,
		answers: string[]
	): Promise<UserQuizQuestionReturnType> {
		try {
			await this.prisma.$transaction([
				this.prisma.userQuestionAnswer.deleteMany({
					where: {
						userQuizQuestionId
					}
				}),
				this.prisma.userQuestionAnswer.createMany({
					data: answers.map((questionAnswerId) => ({
						questionAnswerId,
						userQuizQuestionId
					}))
				})
			]);
			const userQuizQuestion = await this.prisma.userQuizQuestion.findUnique(
				{
					where: {
						id: userQuizQuestionId
					}
				}
			);
			if (!userQuizQuestion) {
				throw new Error(this.NOT_FOUND);
			}

			return userQuizQuestion;
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async submitMyQuiz(
		id: string,
		data: SubmitMyQuizInput
	): Promise<UserQuizReturnType> {
		try {
			const userQuizValidateTime = await this.prisma.userQuiz.findUnique({
				where: {
					id
				},
				include: {
					quiz: true
				}
			});
			if (!userQuizValidateTime) {
				throw new Error(this.NOT_FOUND);
			}
			if (userQuizValidateTime.timeFinish != null) {
				throw new MyBadRequestError({
					quiz: 'Quiz already submitted'
				});
			}
			const timeMaxAllowed = Math.min(
				userQuizValidateTime.quiz.timeClose.getTime(),
				userQuizValidateTime.timeStart.getTime() +
					userQuizValidateTime.quiz.timeLimit
			);
			if (Date.now() > timeMaxAllowed + 1000 * 10) {
				throw new MyBadRequestError({
					quiz: 'Time exceeded'
				});
			}

			await this.prisma.$transaction([
				this.prisma.userQuiz.update({
					where: {
						id
					},
					data: {
						timeFinish: new Date()
					}
				}),
				this.prisma.userQuestionAnswer.deleteMany({
					where: {
						userQuizQuestionId: {
							in: data.questions.map(
								({ userQuizQuestionId }) => userQuizQuestionId
							)
						}
					}
				}),
				this.prisma.userQuestionAnswer.createMany({
					data: data.questions.reduce<
						Prisma.UserQuestionAnswerCreateManyInput[]
					>((acc, curr) => {
						return [
							...acc,
							...curr.answers.map((questionAnswerId) => ({
								questionAnswerId,
								userQuizQuestionId: curr.userQuizQuestionId
							}))
						];
					}, [])
				})
			]);

			const userQuiz = await this.gradeUserQuiz(id);

			return userQuiz;
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			} else if (e instanceof MyBadRequestError) {
				throw new MyBadRequestException(e.data);
			}

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
