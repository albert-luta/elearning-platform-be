import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const universities: SeedDev<Prisma.UniversityCreateManyInput>[] = [
	{
		name: 'Universitatea Politehnica din Bucuresti',
		logo:
			'_development/universities/universitatea-politehnica-din-bucuresti/logo.webp'
	},
	{
		name: 'Universitatea Politehnica din Timisoara',
		logo:
			'_development/universities/universitatea-politehnica-din-timisoara/logo.webp'
	},
	{
		name: 'Universitatea Politehnica din Cluj-Napoca',
		logo:
			'_development/universities/universitatea-politehnica-din-cluj-napoca/logo.webp'
	}
];
