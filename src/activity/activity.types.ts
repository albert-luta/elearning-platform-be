import { ForumReturnType } from 'src/forum/forum.types';
import { AssignmentObject } from './dto/assignment.object';
import { BaseActivityInterface } from './dto/base-activity.interface';
import { QuizQuestionObject } from './dto/quiz-question.object';
import { QuizObject } from './dto/quiz.object';
import { ResourceObject } from './dto/resource.object';

export type BaseActivityReturnType<T extends BaseActivityInterface> = Omit<
	T,
	'college' | 'course'
>;

export type ResourceReturnType = BaseActivityReturnType<ResourceObject>;
export type AssignmentReturnType = BaseActivityReturnType<AssignmentObject>;
export type QuizReturnType = Omit<
	BaseActivityReturnType<QuizObject>,
	'quizQuestions'
>;

export type ActivityReturnType =
	| ResourceReturnType
	| AssignmentReturnType
	| QuizReturnType
	| ForumReturnType;

export type QuizQuestionReturnType = Omit<QuizQuestionObject, 'question'>;
