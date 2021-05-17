import { PrismaClient } from '@prisma/client';
import { universities } from './seed/dev/universities';
import { universitiesUsers } from './seed/dev/universitiesUsers';
import { users } from './seed/dev/users';
import { roles } from './seed/shared/roles';

export const seedDev = async (prisma: PrismaClient) => {
	// Roles and scopes
	for (const role of roles) {
		await prisma.role.create({
			data: role
		});
	}
	const usersPromise = prisma.user.createMany({
		data: users
	});
	const universitiesPromise = prisma.university.createMany({
		data: universities
	});

	await Promise.all([usersPromise, universitiesPromise]);

	for (const universityUser of universitiesUsers) {
		await prisma.universityUser.create({
			data: universityUser
		});
	}
};
