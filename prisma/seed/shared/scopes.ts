import { Prisma } from '.prisma/client';
import { UserRole } from '../../../src/auth/auth.types';

const studentScopes: Prisma.ScopeCreateManyInput[] = [
	{
		name: 'read:colleges'
	},
	{
		name: 'read:sections'
	},
	{
		name: 'create:section'
	},
	{
		name: 'update:section'
	},
	{
		name: 'delete:section'
	}
];
const teacherScopes: Prisma.ScopeCreateManyInput[] = [...studentScopes];
const adminScopes: Prisma.ScopeCreateManyInput[] = [
	...teacherScopes,
	{
		name: 'create:college'
	},
	{
		name: 'update:college'
	},
	{
		name: 'delete:college'
	}
];

export const scopes: Record<UserRole, Prisma.ScopeCreateManyInput[]> = {
	[UserRole.ADMIN]: adminScopes,
	[UserRole.TEACHER]: teacherScopes,
	[UserRole.STUDENT]: studentScopes
};
