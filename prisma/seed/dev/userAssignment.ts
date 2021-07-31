import { UserAssignment } from '.prisma/client';

export const userAssignment: Omit<
	UserAssignment,
	'id' | 'userId' | 'assignmentId' | 'updatedAt'
> = {
	grade: 15,
	files: [
		'_development/user-assignments/files/Luta_Albert-Lucian_Cerere-Inscriere.pdf',
		'_development/user-assignments/files/Luta_Albert-Lucian_Chestionar-Angajabilitate.pdf',
		'_development/user-assignments/files/Luta_Albert-Lucian_Declaratie-Originalitate.pdf',
		'_development/user-assignments/files/format licenta Mihai.docx'
	]
};
