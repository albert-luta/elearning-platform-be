import { PrismaClient } from '@prisma/client';
import { roles } from './seed/roles';
import { scopes } from './seed/scopes';
import { universities } from './seed/universities';
import { universitiesUsers } from './seed/universitiesUsers';
import { users } from './seed/users';

const prisma = new PrismaClient();

const seed = async () => {
	const rolesPromise = prisma.role.createMany({
		data: roles
	});
	const scopesPromise = prisma.scope.createMany({
		data: scopes
	});
	const usersPromise = prisma.user.createMany({
		data: users
	});
	const universitiesPromise = prisma.university.createMany({
		data: universities
	});

	await Promise.all([
		rolesPromise,
		scopesPromise,
		usersPromise,
		universitiesPromise
	]);

	await prisma.universityUser.createMany({
		data: universitiesUsers
	});
};

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
