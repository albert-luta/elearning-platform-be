import { BaseActivityReturnType } from 'src/activity/activity.types';
import { ForumObject } from 'src/forum/dto/forum.object';
import { UniversityUserObject } from 'src/forum/dto/university-user.object';
import { ForumCommentObject } from './dto/forum-comment.object';

export type ForumReturnType = Omit<
	BaseActivityReturnType<ForumObject>,
	'universityUser'
>;
export type UniversityUserReturnType = Omit<
	UniversityUserObject,
	'user' | 'role'
>;
export type ForumCommentReturnType = Omit<ForumCommentObject, 'universityUser'>;
