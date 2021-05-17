import { Prisma } from '.prisma/client';
import { UserRole } from '../../../src/auth/auth.types';

const studentScopes: Prisma.ScopeCreateManyInput[] = [];
const teacherScopes: Prisma.ScopeCreateManyInput[] = [...studentScopes];
const adminCollegeScopes: Prisma.ScopeCreateManyInput[] = [...teacherScopes];
const adminUniversityScopes: Prisma.ScopeCreateManyInput[] = [
	...adminCollegeScopes
];

export const scopes: Record<UserRole, Prisma.ScopeCreateManyInput[]> = {
	[UserRole.ADMIN_UNIVERSITY]: adminUniversityScopes,
	[UserRole.ADMIN_COLLEGE]: adminCollegeScopes,
	[UserRole.TEACHER]: teacherScopes,
	[UserRole.STUDENT]: studentScopes
};
