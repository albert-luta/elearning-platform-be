import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const courses: SeedDev<
	Omit<Prisma.CourseCreateManyInput, 'collegeId'>
>[] = [
	{
		name: 'A1-S1: Programarea calculatoarelor'
	},
	{
		name: 'A1-S2: Structuri de date si algoritmi'
	},
	{
		name: 'A2-S1: Programare Obiect-Orientata'
	},
	{
		name: 'A3-S2: Tehnici de Optimizare'
	},
	{
		name: 'A3-S2: Tehnologii de programare in Internet'
	},
	{
		name: 'A4-S2: Calcul paralel'
	}
];
