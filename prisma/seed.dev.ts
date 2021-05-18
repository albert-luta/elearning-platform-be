import { PrismaClient } from '@prisma/client';
import { colleges } from './seed/dev/colleges';
import { courses } from './seed/dev/courses';
import { universities } from './seed/dev/universities';
import { users } from './seed/dev/users';
import { expand } from './seed/dev/utills';
import { roles } from './seed/shared/roles';

export const seedDev = async (prisma: PrismaClient) => {
	// Roles and scopes
	for (const role of roles) {
		await prisma.role.create({
			data: role
		});
	}
	await Promise.all([
		prisma.user.createMany({
			data: users
		}),
		prisma.university.createMany({
			data: universities
		})
	]);

	const [
		createdRoles,
		createdUsers,
		createdUniversities
	] = await Promise.all([
		prisma.role.findMany(),
		prisma.user.findMany(),
		prisma.university.findMany()
	]);
	await prisma.universityUser.createMany({
		data: expand(createdUsers, createdUniversities, (user, university) => ({
			userId: user.id,
			universityId: university.id,
			roleId:
				createdRoles.find(({ name }) => name === university.name)?.id ??
				createdRoles[0].id
		}))
	});

	await prisma.college.createMany({
		data: expand(createdUniversities, colleges, ({ id }, college) => ({
			...college,
			universityId: id
		}))
	});

	const createdColleges = await prisma.college.findMany();
	await prisma.course.createMany({
		data: expand(
			createdColleges,
			courses,
			({ universityId, id }, course) => ({
				...course,
				universityId: universityId,
				collegeId: id
			})
		)
	});
};
