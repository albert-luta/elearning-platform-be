import { PrismaClient } from '.prisma/client';
import { seedDev } from './seed.dev';
import { seedProd } from './seed.prod';

const prisma = new PrismaClient();

let seed: (prisma: PrismaClient) => Promise<void>;

if (process.env.NODE_ENV === 'production') {
	seed = seedProd;
} else {
	seed = seedDev;
}

seed(prisma)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
