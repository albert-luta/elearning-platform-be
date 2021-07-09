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
	points: 30
};
export const quizActivity: SpecificActivity<Prisma.QuizCreateManyInput> = {};
