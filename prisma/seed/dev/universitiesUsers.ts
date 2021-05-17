import { Prisma } from '.prisma/client';
import { roles } from '../shared/roles';
import { universities } from './universities';
import { users } from './users';

export const universitiesUsers: Prisma.UniversityUserCreateInput[] = universities.map(
	(university, i) => ({
		role: {
			connect: {
				name: roles[i].name
			}
		},
		university: {
			connect: {
				id: university.id
			}
		},
		user: {
			connect: {
				id: users[0].id
			}
		}
	})
);
