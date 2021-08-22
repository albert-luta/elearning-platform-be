import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const sections: SeedDev<
	Omit<Prisma.SectionCreateManyInput, 'courseId' | 'createdAt'>
>[] = [
	{
		name: 'Curs'
	},
	{
		name: 'Seminar'
	},
	{
		name: 'Laborator'
	}
];
