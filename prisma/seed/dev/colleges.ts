import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const colleges: SeedDev<Prisma.CollegeCreateManyInput>[] = [
	{
		name:
			'Facultatea de Electronică, Telecomunicații și Tehnologia Informației'
	},
	{
		name: 'Facultatea de Automatică și Calculatoare'
	},
	{
		name: 'Facultatea de Inginerie Electrică'
	},
	{
		name: 'Facultatea de Energetică'
	},
	{
		name: 'Facultatea de Inginerie Mecanică și Mecatronică'
	},
	{
		name: 'Facultatea de Inginerie Aerospațială'
	}
];
