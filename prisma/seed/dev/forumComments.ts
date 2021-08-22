import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const forumComments: SeedDev<
	Omit<Prisma.ForumCommentCreateManyInput, 'forumId' | 'universityUserId'>
>[] = [
	{
		text:
			'Mie personal, mi-ar placea sa avem un exemplu de exercitiu rezolvat'
	},
	{
		text: 'Mai multe exercitii practice ar fi interesant'
	},
	{
		text: 'Si eu sunt de acord cu exemplul de exercitiu rezolvat'
	}
];
