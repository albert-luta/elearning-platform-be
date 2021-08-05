import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateQuestionCategoryInput } from './dto/create-question-category.input';
import { QuestionCategoryReturnType } from './question-bank.types';

@Injectable()
export class QuestionBankService {
	constructor(private readonly prisma: PrismaService) {}

	async getQuestionBank(
		universityId: string,
		userId: string
	): Promise<QuestionCategoryReturnType[]> {
		try {
			const questionBank = await this.prisma.questionCategory.findMany({
				where: {
					universityUser: {
						userId,
						universityId
					}
				},
				orderBy: {
					name: 'asc'
				}
			});

			return questionBank;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createQuestionCategory(
		universityId: string,
		userId: string,
		data: CreateQuestionCategoryInput
	): Promise<QuestionCategoryReturnType> {
		try {
			const questionCategory = await this.prisma.questionCategory.create({
				data: {
					...data,
					universityUser: {
						connect: {
							universityId_userId: {
								universityId,
								userId
							}
						}
					}
				}
			});

			return questionCategory;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateQuestionCategory(
		id: string,
		data: CreateQuestionCategoryInput
	): Promise<QuestionCategoryReturnType> {
		try {
			const questionCategory = await this.prisma.questionCategory.update({
				where: {
					id
				},
				data
			});

			return questionCategory;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async deleteQuestionCategory(
		id: string
	): Promise<QuestionCategoryReturnType> {
		try {
			const questionCategory = await this.prisma.questionCategory.delete({
				where: {
					id
				}
			});

			return questionCategory;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
