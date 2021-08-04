import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
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
}
