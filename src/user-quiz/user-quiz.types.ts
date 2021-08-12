import { UserQuizQuestionObject } from './dto/user-quiz-question.object';
import { UserQuizObject } from './dto/user-quiz.object';

export type UserQuizReturnType = Omit<UserQuizObject, 'questions' | 'user'>;
export type UserQuizQuestionReturnType = Omit<
	UserQuizQuestionObject,
	'question' | 'pickedAnswers'
>;
