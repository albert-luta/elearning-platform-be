import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const forumComments: SeedDev<
	Omit<Prisma.ForumCommentCreateManyInput, 'forumId' | 'universityUserId'>
>[] = [
	{
		text: 'First forum comment'
	},
	{
		text: 'Some forum comment again'
	},
	{
		text: 'Hello, what is going on'
	}
];
