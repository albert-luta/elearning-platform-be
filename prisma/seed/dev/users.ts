import { Prisma } from '.prisma/client';
import { RequiredFields } from 'src/general/utils/types';

export const users: RequiredFields<Prisma.UserCreateManyInput, 'id'>[] = [
	{
		id: 'ckoml3l1z00073b6b10afztra',
		email: 'test@test.com',
		fatherInitial: 'T',
		firstName: 'First',
		lastName: 'Last',
		password:
			'$argon2i$v=19$m=4096,t=3,p=1$ie/5oMvgcybXIM9UlD1zdg$f747QByyfh/Ui2Z8UftV0Uu+KPvtl2aPvDfkXPtSFq4',
		avatar: '_development/users/test/logo.png'
	}
];
