import { PrismaClient } from '@prisma/client';
import { ActivityType } from '../src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import {
	activities,
	assignmentActivity,
	quizActivity,
	resourceActivity
} from './seed/dev/activities';
import { colleges } from './seed/dev/colleges';
import { courses } from './seed/dev/courses';
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
	const [createdUniversityUsers, createdColleges] = await Promise.all([
		prisma.universityUser.findMany(),
		prisma.college.findMany()
	]);
	await prisma.collegeUser.createMany({
		data: expand(
			createdUniversityUsers,
			createdColleges,
			({ id: universityUserId }, { id: collegeId }) => ({
				universityUserId,
				collegeId
			})
		)
	});

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
	const [createdCollegeUsers, createdCourses] = await Promise.all([
		prisma.collegeUser.findMany(),
		prisma.course.findMany()
	]);
	await prisma.courseUser.createMany({
		data: expand(
			createdCollegeUsers,
			createdCourses,
			({ id: collegeUserId }, { id: courseId }) => ({
				collegeUserId,
				courseId
			})
		)
	});

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
		createdQuizActivities
	] = await Promise.all([
		prisma.activity.findMany({ where: { type: ActivityType.RESOURCE } }),
		prisma.activity.findMany({ where: { type: ActivityType.ASSIGNMENT } }),
		prisma.activity.findMany({ where: { type: ActivityType.QUIZ } })
	]);
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
		})
		// TODO: create forum activities
	]);

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
			maxGrade: Math.floor(Math.random() * 16) // 0 - 15
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
						Math.floor(Math.random() * questionAnswers.length)
					].id
			})
		)
	});
};
