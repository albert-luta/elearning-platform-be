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
		name: 'read:activity'
	},
	{
		name: 'read:my-assignment'
	},
	{
		name: 'update:my-assignment'
	},
	{
		name: 'read:my-quiz-attempt'
	},
	{
		name: 'create:my-quiz-attempt'
	}
];
const teacherScopes: Prisma.ScopeCreateManyInput[] = [
	...studentScopes,
	{
		name: 'create:section'
	},
	{
		name: 'update:section'
	},
	{
		name: 'delete:section'
	},
	{
		name: 'create:resource'
	},
	{
		name: 'update:resource'
	},
	{
		name: 'create:assignment'
	},
	{
		name: 'update:assignment'
	},
	{
		name: 'create:quiz'
	},
	{
		name: 'update:quiz'
	},
	{
		name: 'delete:activity'
	},
	{
		name: 'read:user-assignment'
	},
	{
		name: 'update:user-assignment'
	},
	{
		name: 'read:user-assignments'
	},
	{
		name: 'read:question-bank'
	},
	{
		name: 'create:question-category'
	},
	{
		name: 'update:question-category'
	},
	{
		name: 'delete:question-category'
	},
	{
		name: 'create:question'
	},
	{
		name: 'update:question'
	},
	{
		name: 'delete:question'
	}
];
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
	},
	{
		name: 'create:course'
	},
	{
		name: 'update:course'
	},
	{
		name: 'delete:course'
	}
];

export const scopes: Record<UserRole, Prisma.ScopeCreateManyInput[]> = {
	[UserRole.ADMIN]: adminScopes,
	[UserRole.TEACHER]: teacherScopes,
	[UserRole.STUDENT]: studentScopes
};
