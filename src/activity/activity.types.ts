import { ForumReturnType } from 'src/forum/forum.types';
import { AssignmentObject } from './dto/assignment.object';
import { QuizQuestionObject } from './dto/quiz-question.object';
import { QuizObject } from './dto/quiz.object';
import { ResourceObject } from './dto/resource.object';

export type QuizReturnType = Omit<QuizObject, 'quizQuestions'>;
export type ActivityReturnType =
	| ResourceObject
	| AssignmentObject
	| QuizReturnType
	| ForumReturnType;
export type QuizQuestionReturnType = Omit<QuizQuestionObject, 'question'>;
