import { Prisma } from '.prisma/client';
import { ActivityType } from '../../../src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { SeedDev } from './utills';

type SpecificActivity<T extends { activityId: string }> = Omit<
	SeedDev<T>,
	'activityId'
>;

export const activities: SeedDev<
	Omit<Prisma.ActivityCreateManyInput, 'sectionId' | 'createdAt'>
>[] = [
	{
		name: 'Resource name',
		description: 'Optional description in a resource',
		type: ActivityType.RESOURCE
	},
	{
		name: 'Assignment name',
		type: ActivityType.ASSIGNMENT
	},
	{
		name: 'Quiz name',
		type: ActivityType.QUIZ
	}
];

export const resourceActivity: SpecificActivity<Prisma.ResourceCreateManyInput> = {};
export const assignmentActivity: SpecificActivity<Prisma.AssignmentCreateManyInput> = {
	deadline: new Date(),
	maxGrade: 30
};
const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
export const quizActivity: SpecificActivity<Prisma.QuizCreateManyInput> = {
	visible: true,
	shuffleQuestions: true,
	shuffleAnswers: true,
	timeOpen: new Date(Date.now() + HOUR_IN_MILLISECONDS),
	timeClose: new Date(Date.now() + HOUR_IN_MILLISECONDS * 2),
	timeLimit: HOUR_IN_MILLISECONDS * 1.5
};
