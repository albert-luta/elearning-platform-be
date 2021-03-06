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
	},
	{
		name: 'update:question-answers'
	},
	{
		name: 'update:submit-my-quiz'
	},
	{
		name: 'read:forum-comments'
	},
	{
		name: 'create:forum-comment'
	},
	{
		name: 'read:upcoming-activities'
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
	},
	{
		name: 'read:user-quiz-attempt'
	},
	{
		name: 'read:user-quiz-attempts'
	},
	{
		name: 'create:forum'
	},
	{
		name: 'update:forum'
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
	},
	{
		name: 'read:roles'
	},
	{
		name: 'read:university-user'
	},
	{
		name: 'read:university-users'
	},
	{
		name: 'create:university-user'
	},
	{
		name: 'update:university-user'
	},
	{
		name: 'delete:university-user'
	}
];

export const scopes: Record<UserRole, Prisma.ScopeCreateManyInput[]> = {
	[UserRole.ADMIN]: adminScopes,
	[UserRole.TEACHER]: teacherScopes,
	[UserRole.STUDENT]: studentScopes
};
