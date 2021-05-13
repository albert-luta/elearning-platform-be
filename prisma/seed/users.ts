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
			'$argon2id$v=19$m=4096,t=2,p=1$QWhGN0gwczJhUWFCVG1yUA$oVqLpRU1SamQ2GLhNTjHHNFPmsMxu9PkAnm6CbLmAy8'
	}
];
