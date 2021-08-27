import {
	College,
	CollegeUser,
	Course,
	PrismaClient,
	UniversityUser
} from '@prisma/client';
import { UserRole } from '../src/auth/auth.types';
import { generateRandomInt } from '../src/general/utils/generate-random-int';
import { ActivityType } from '../src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import {
	activities,
	assignmentActivity,
	forumActivity,
	quizActivity,
	resourceActivity
} from './seed/dev/activities';
import { colleges } from './seed/dev/colleges';
import { courses } from './seed/dev/courses';
import { forumComments } from './seed/dev/forumComments';
import { questionCategories } from './seed/dev/questionCategories';
import { questions } from './seed/dev/questions';
import { sections } from './seed/dev/sections';
import { universities } from './seed/dev/universities';
import { userAssignment } from './seed/dev/userAssignment';
import { userQuiz } from './seed/dev/userQuiz';
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
			roleId: createdRoles[generateRandomInt(0, createdRoles.length)].id
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
				universityId,
				collegeId: id
			})
		)
	});

	const createdUniversityUsers = await prisma.universityUser.findMany();
	const createdUniversityUsersGroupedByUniversityId = createdUniversityUsers.reduce<
		Record<string, UniversityUser[]>
	>(
		(acc, curr) => ({
			...acc,
			[curr.universityId]: [...(acc[curr.universityId] ?? []), curr]
		}),
		{}
	);
	const createdCollegesGroupedByUniversityId = createdColleges.reduce<
		Record<string, College[]>
	>(
		(acc, curr) => ({
			...acc,
			[curr.universityId]: [...(acc[curr.universityId] ?? []), curr]
		}),
		{}
	);
	await Promise.all(
		createdUniversities.map(({ id }) =>
			prisma.collegeUser.createMany({
				data: expand(
					createdUniversityUsersGroupedByUniversityId[id],
					createdCollegesGroupedByUniversityId[id],
					({ id: universityUserId }, { id: collegeId }) => ({
						universityUserId,
						collegeId
					})
				)
			})
		)
	);

	const [createdCollegeUsers, createdCourses] = await Promise.all([
		prisma.collegeUser.findMany(),
		prisma.course.findMany()
	]);
	const createdCollegeUsersGroupedByCollegeId = createdCollegeUsers.reduce<
		Record<string, CollegeUser[]>
	>(
		(acc, curr) => ({
			...acc,
			[curr.collegeId]: [...(acc[curr.collegeId] ?? []), curr]
		}),
		{}
	);
	const createdCoursesGroupedByCollegeId = createdCourses.reduce<
		Record<string, Course[]>
	>(
		(acc, curr) => ({
			...acc,
			[curr.collegeId]: [...(acc[curr.collegeId] ?? []), curr]
		}),
		{}
	);
	await Promise.all(
		createdColleges.map(({ id }) =>
			prisma.courseUser.createMany({
				data: expand(
					createdCollegeUsersGroupedByCollegeId[id],
					createdCoursesGroupedByCollegeId[id],
					({ id: collegeUserId }, { id: courseId }) => ({
						collegeUserId,
						courseId
					})
				)
			})
		)
	);

	await prisma.section.createMany({
		data: expand(
			createdCourses,
			sections,
			({ universityId, id }, section) => ({
				...section,
				universityId,
				courseId: id
			})
		)
	});

	const createdSections = await prisma.section.findMany();
	await prisma.activity.createMany({
		data: expand(
			createdSections,
			activities,
			({ universityId, id }, activity) => ({
				...activity,
				universityId,
				sectionId: id
			})
		)
	});

	const [
		createdResourceActivities,
		createdAssignmentActivities,
		createdQuizActivities,
		createdForumActivities
	] = await Promise.all([
		prisma.activity.findMany({ where: { type: ActivityType.RESOURCE } }),
		prisma.activity.findMany({ where: { type: ActivityType.ASSIGNMENT } }),
		prisma.activity.findMany({ where: { type: ActivityType.QUIZ } }),
		prisma.activity.findMany({ where: { type: ActivityType.FORUM } })
	]);

	// const adminRoleId = createdRoles.find(({ name }) => name === UserRole.ADMIN)
	// 	?.id;
	// const teacherRoleId = createdRoles.find(
	// 	({ name }) => name === UserRole.TEACHER
	// )?.id;
	const studentRoleId = createdRoles.find(
		({ name }) => name === UserRole.STUDENT
	)?.id;

	await Promise.all([
		prisma.resource.createMany({
			data: createdResourceActivities.map(({ universityId, id }) => ({
				...resourceActivity,
				universityId,
				activityId: id
			}))
		}),
		prisma.assignment.createMany({
			data: createdAssignmentActivities.map(({ universityId, id }) => ({
				...assignmentActivity,
				universityId,
				activityId: id
			}))
		}),
		prisma.quiz.createMany({
			data: createdQuizActivities.map(({ universityId, id }) => ({
				...quizActivity,
				universityId,
				activityId: id
			}))
		}),
		prisma.forum.createMany({
			data: createdForumActivities.map(({ universityId, id }) => ({
				...forumActivity,
				universityId,
				activityId: id,
				universityUserId:
					createdUniversityUsersGroupedByUniversityId[
						universityId
					].find(({ roleId }) => roleId !== studentRoleId)?.id ??
					createdUniversityUsers[0].id
			}))
		})
	]);

	const createdForums = await prisma.forum.findMany();
	await prisma.forumComment.createMany({
		data: expand(
			createdForums,
			forumComments,
			({ activityId: forumId, universityId }, comment) => ({
				...comment,
				forumId,
				universityUserId:
					createdUniversityUsersGroupedByUniversityId[universityId][
						generateRandomInt(
							0,
							createdUniversityUsersGroupedByUniversityId[
								universityId
							].length
						)
					].id ?? createdUniversityUsers[1].id
			})
		)
	});

	const createdAssignments = await prisma.assignment.findMany();
	await prisma.userAssignment.createMany({
		data: expand(
			createdUsers,
			createdAssignments,
			({ id: userId }, { activityId: assignmentId }) => ({
				userId,
				assignmentId,
				...userAssignment
			})
		)
	});

	await prisma.questionCategory.createMany({
		data: expand(
			createdUniversityUsers,
			questionCategories,
			({ id }, questionCategory) => ({
				...questionCategory,
				universityUserId: id
			})
		)
	});

	const createdQuestionCategories = await prisma.questionCategory.findMany();
	await Promise.all(
		expand(createdQuestionCategories, questions, (category, question) => ({
			category,
			question
		})).map(({ category: { id }, question }) =>
			prisma.question.create({
				data: {
					...question,
					questionCategoryId: id
				}
			})
		)
	);

	// Lazy implementation
	const createdQuizes = await prisma.quiz.findMany();
	const createdQuestions = await prisma.question.findMany({
		take: 15
	});
	await prisma.quizQuestion.createMany({
		data: expand(createdQuizes, createdQuestions, (quiz, question) => ({
			quizId: quiz.activityId,
			questionId: question.id,
			order: 0, // Doesn't matter
			maxGrade: generateRandomInt(0, 15 + 1) // 0 - 15
		}))
	});

	const createdCompleteQuizes = await prisma.quiz.findMany({
		include: {
			quizQuestions: true
		}
	});
	await Promise.all(
		expand(createdUsers, createdCompleteQuizes, (user, quiz) => ({
			user,
			quiz
		})).map(({ user, quiz }) =>
			prisma.userQuiz.create({
				data: {
					userId: user.id,
					quizId: quiz.activityId,
					...userQuiz,
					userQuizQuestions: {
						createMany: {
							data: quiz.quizQuestions.map(({ id }) => ({
								quizQuestionId: id
							}))
						}
					}
				}
			})
		)
	);

	const createdUserQuizQuestions = await prisma.userQuizQuestion.findMany({
		select: {
			id: true,
			quizQuestion: {
				select: {
					question: {
						select: {
							questionAnswers: {
								select: {
									id: true
								}
							}
						}
					}
				}
			}
		}
	});
	await prisma.userQuestionAnswer.createMany({
		data: createdUserQuizQuestions.map(
			({
				id,
				quizQuestion: {
					question: { questionAnswers }
				}
			}) => ({
				userQuizQuestionId: id,
				questionAnswerId:
					questionAnswers[
						generateRandomInt(0, questionAnswers.length)
					].id
			})
		)
	});
};
