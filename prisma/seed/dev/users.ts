import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const users: SeedDev<Prisma.UserCreateManyInput>[] = [
	{
		email: 'test@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test/avatar.png'
	},
	{
		email: 'test2@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4'
	},
	{
		email: 'test3@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4'
	},
	{
		email: 'test4@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4'
	},
	{
		email: 'test5@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4'
	}
];
