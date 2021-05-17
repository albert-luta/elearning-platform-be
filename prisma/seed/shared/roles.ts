import { Prisma } from '.prisma/client';
import { UserRole } from '../../../src/auth/auth.types';
import { scopes } from './scopes';

export const roles: Prisma.RoleCreateInput[] = Object.values(UserRole).map(
	(role) => ({
		name: role,
		scopes: {
			connectOrCreate: scopes[role].map((scope) => ({
				create: scope,
				where: scope
			}))
		}
	})
);
