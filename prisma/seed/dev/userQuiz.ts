import { UserQuiz } from '.prisma/client';
import { SeedDev } from './utills';

export const userQuiz: Omit<SeedDev<UserQuiz>, 'userId' | 'quizId'> = {
	timeStart: new Date(),
	timeFinish: null
};
