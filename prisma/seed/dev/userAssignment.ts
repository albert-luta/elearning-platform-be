import { UserAssignment } from '.prisma/client';
import { SeedDev } from './utills';

export const userAssignment: Omit<
	SeedDev<UserAssignment>,
	'userId' | 'assignmentId' | 'updatedAt'
> = {
	grade: 15,
	files: [
		'_development/user-assignment/IonPopescu_414A_Oscilatii-Mecanice.pdf'
	]
};
