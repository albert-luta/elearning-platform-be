import { Prisma } from '.prisma/client';
import { UserRole } from '../../src/auth/auth.types';
import { RequiredFields } from 'src/general/utils/types';

export const universities: RequiredFields<
	Prisma.UniversityCreateManyInput,
	'id'
>[] = [
	{
		id: 'ckoml3l1z00033b6bcsnatjhm',
		name: UserRole.ADMIN_UNIVERSITY
	},
	{
		id: 'ckoml3l1z00043b6bhxknk0of',
		name: UserRole.ADMIN_COLLEGE
	},
	{
		id: 'ckoml3l1z00053b6botbfi6jt',
		name: UserRole.TEACHER
	},
	{
		id: 'ckoml3l1z00063b6bjsy7id6g',
		name: UserRole.STUDENT
	}
];
