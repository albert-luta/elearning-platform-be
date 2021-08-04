import { QuestionCategoryObject } from './dto/question-category.object';
import { QuestionObject } from './dto/question.object';

export type QuestionCategoryReturnType = Omit<
	QuestionCategoryObject,
	'questions'
>;
export type QuestionReturnType = Omit<QuestionObject, 'answers'>;
