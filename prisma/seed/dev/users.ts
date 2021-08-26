import { Prisma } from '.prisma/client';
import { SeedDev } from './utills';

export const users: SeedDev<Prisma.UserCreateManyInput>[] = [
	{
		email: 'test@test.com',
		fatherInitial: 'N',
		firstName: 'Ion',
		lastName: 'POPESCU',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test/avatar.webp'
	},
	{
		email: 'test2@test.com',
		fatherInitial: 'I',
		firstName: 'Andrei',
		lastName: 'IONESCU',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test2/avatar.webp'
	},
	{
		email: 'test3@test.com',
		fatherInitial: 'A',
		firstName: 'Maria',
		lastName: 'POPA',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test3/avatar.webp'
	},
	{
		email: 'test4@test.com',
		fatherInitial: 'S',
		firstName: 'Alexandra',
		lastName: 'DUMITRESCU',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test4/avatar.webp'
	},
	{
		email: 'test5@test.com',
		fatherInitial: 'T',
		firstName: 'Stefan',
		lastName: 'TUDOR',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test5/avatar.webp'
	}
];
