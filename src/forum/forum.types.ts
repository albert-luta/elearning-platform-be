import { ForumObject } from 'src/forum/dto/forum.object';
import { UniversityUserObject } from 'src/forum/dto/university-user.object';

export type ForumReturnType = Omit<ForumObject, 'universityUser'>;
export type UniversityUserReturnType = Omit<
	UniversityUserObject,
	'user' | 'role'
>;
