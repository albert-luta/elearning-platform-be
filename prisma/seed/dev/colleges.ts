import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const colleges: SeedDev<Prisma.CollegeCreateManyInput>[] = [
	{
		name: 'Electronica'
	},
	{
		name: 'Automatica'
	},
	{
		name: 'Electrica'
	},
	{
		name: 'Mecanica'
	},
	{
		name: 'Inginerie spatiala'
	},
	{
		name: 'Antreprenoriat si Ingineria afacerilor'
	}
];
