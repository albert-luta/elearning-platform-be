import { Prisma } from '.prisma/client';
import { UserRole } from '../../../src/auth/auth.types';
import { SeedDev } from './utills';

export const universities: SeedDev<Prisma.UniversityCreateManyInput>[] = Object.values(
	UserRole
).map(
	(role): SeedDev<Prisma.UniversityCreateManyInput> => ({
		name: role,
		logo:
			role === UserRole.ADMIN_UNIVERSITY
				? '_development/universities/admin-university/logo.png'
				: undefined
	})
);
