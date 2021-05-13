import { Prisma } from '.prisma/client';
import { roles } from './roles';
import { universities } from './universities';
import { users } from './users';

export const universitiesUsers: Prisma.UniversityUserCreateManyInput[] = universities.map(
	(university, i) => ({
		roleId: roles[i].id,
		universityId: university.id,
		userId: users[0].id
	})
);
