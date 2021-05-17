import { Prisma } from '.prisma/client';
import { UserRole } from '../../../src/auth/auth.types';
import { RequiredFields } from 'src/general/utils/types';

const getUniversityId = (role: UserRole): string => {
	switch (role) {
		case UserRole.ADMIN_UNIVERSITY:
			return 'ckoml3l1z00033b6bcsnatjhm';
		case UserRole.ADMIN_COLLEGE:
			return 'ckoml3l1z00043b6bhxknk0of';
		case UserRole.TEACHER:
			return 'ckoml3l1z00053b6botbfi6jt';
		case UserRole.STUDENT:
			return 'ckoml3l1z00063b6bjsy7id6g';
	}
};

export const universities: RequiredFields<
	Prisma.UniversityCreateManyInput,
	'id'
>[] = Object.values(UserRole).map((role) => ({
	id: getUniversityId(role),
	name: role
		.split('_')
		.map((w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
		.join(' '),
	logo:
		role === UserRole.ADMIN_UNIVERSITY
			? '_development/universities/admin-university/logo.png'
			: undefined
}));
