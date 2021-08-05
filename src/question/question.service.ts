import { Question } from '.prisma/client';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { QuestionType } from 'src/generated/prisma-nestjs-graphql/prisma/question-type.enum';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { QuestionReturnType } from 'src/question-bank/question-bank.types';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Injectable()
export class QuestionService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	private sanitizeQuestion<T extends Question>(
		question: T
	): Omit<T, 'type'> & { type: QuestionType } {
		const { type, ...rest } = question;

		return { ...rest, type: type as QuestionType };
	}

	async createQuestion(
		questionCategoryId: string,
		{ answers, ...questionData }: CreateQuestionInput
	): Promise<QuestionReturnType> {
		try {
			const question = this.sanitizeQuestion(
				await this.prisma.question.create({
					data: {
						...questionData,
						questionCategoryId,
						questionAnswers: {
							createMany: {
								data: answers
							}
						}
					}
				})
			);

			return question;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateQuestion(
		id: string,
		{ answers, ...questionData }: UpdateQuestionInput
	): Promise<QuestionReturnType> {
		try {
			await this.prisma.$transaction([
				this.prisma.question.update({
					where: {
						id
					},
					data: questionData
				}),
				this.prisma.questionAnswer.deleteMany({
					where: {
						questionId: id
					}
				}),
				this.prisma.questionAnswer.createMany({
					data: answers.map((answer) => ({
						...answer,
						questionId: id
					}))
				})
			]);

			const question = await this.prisma.question.findUnique({
				where: {
					id
				}
			});
			if (!question) {
				throw new Error(this.NOT_FOUND);
			}

			return this.sanitizeQuestion(question);
		} catch (e) {
			if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteQuestion(id: string): Promise<QuestionReturnType> {
		try {
			const question = this.sanitizeQuestion(
				await this.prisma.question.delete({
					where: {
						id
					}
				})
			);

			return question;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
