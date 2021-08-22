import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const questionCategories: SeedDev<
	Omit<Prisma.QuestionCategoryCreateManyInput, 'universityUserId'>
>[] = [
	{
		name: 'Programare Obiect-Orientata'
	},
	{
		name: 'Structuri de date si algoritmi'
	},
	{
		name: 'Programarea calculatoarelor'
	}
];
