import { Prisma } from '.prisma/client';
import { QuestionType } from '../../../src/generated/prisma-nestjs-graphql/prisma/question-type.enum';
import { SeedDev } from './utills';

export const questions: SeedDev<
	Omit<Prisma.QuestionCreateInput, 'questionCategory'>
>[] = [
	{
		name: 'Mostenirea claselor',
		text: 'Care dintre urmatoarele afirmatii este adevarata:',
		type: QuestionType.SINGLE_CHOICE,
		questionAnswers: {
			createMany: {
				data: [
					{
						text:
							'In C++ o clasa copil poate mosteni de la mai multe clase parinte',
						fraction: 0
					},
					{
						text:
							'In C se folosesc intensiv mosteniri ale claselor',
						fraction: 1
					},
					{
						text: 'Python nu accepta mosteniri',
						fraction: 0
					},
					{
						text:
							'In Python o clasa copil poate mosteni de la mai multe clase parinte',
						fraction: 0
					}
				]
			}
		}
	},
	{
		name: 'Structuri de date',
		text: 'Care dintre urmatoarele afirmatii sunt adevarate:',
		type: QuestionType.MULTIPLE_CHOICE,
		questionAnswers: {
			createMany: {
				data: [
					{
						text:
							'Fiecare nod al unei liste dublu inlantuite are nevoie de 2 pointeri',
						fraction: 0.5
					},
					{
						text:
							'O lista simplu inlantuit poate fi parcursa in O(log(n)) timp',
						fraction: 0
					},
					{
						text:
							'Cea mai folosita structura de date pentru cautarea rapida este arborele binar',
						fraction: 0.5
					},
					{
						text:
							'Inserarea unui element intr-o lista se face in O(1) timp',
						fraction: 0
					}
				]
			}
		}
	},
	{
		name: 'Operatie aritmetica simpla',
		text: 'Care este rezultatul urmatoarei operatii: 5 + 5 * 5?',
		type: QuestionType.NUMERICAL,
		questionAnswers: {
			createMany: {
				data: [
					{
						text: '30',
						fraction: 1
					}
				]
			}
		}
	}
];