import { PrismaClient } from '.prisma/client';
import { roles } from './seed/shared/roles';

export const seedProd = async (prisma: PrismaClient) => {
	// Roles and scopes
	for (const role of roles) {
		await prisma.role.create({
			data: role
		});
	}
};
