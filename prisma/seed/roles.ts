import { Prisma } from '.prisma/client';
import { UserRole } from '../../src/auth/auth.types';
import { RequiredFields } from 'src/general/utils/types';

export const roles: RequiredFields<Prisma.RoleCreateManyInput, 'id'>[] = [
	{
		id: 'ckoml2qx6000001l3cz67cy8r',
		name: UserRole.ADMIN_UNIVERSITY
	},
	{
		id: 'ckoml3l1z00003b6bojp2rbh2',
		name: UserRole.ADMIN_COLLEGE
	},
	{
		id: 'ckoml3l1z00013b6bzsjpnr4t',
		name: UserRole.TEACHER
	},
	{
		id: 'ckoml3l1z00023b6bjbzsgod7',
		name: UserRole.STUDENT
	}
];
