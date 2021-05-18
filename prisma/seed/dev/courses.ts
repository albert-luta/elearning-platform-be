import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const courses: SeedDev<
	Omit<Prisma.CourseCreateManyInput, 'collegeId'>
>[] = [
	{
		name: 'Programare Obiect Orientata'
	},
	{
		name: 'Programarea calculatoarelor'
	},
	{
		name: 'Programare distribuita'
	},
	{
		name: 'Tehnici de programare pentru internet'
	}
];
