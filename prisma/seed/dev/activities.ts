import { Prisma } from '.prisma/client';
import { ActivityType } from '../../../src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { SeedDev } from './utills';

type SpecificActivity<T extends { activityId: string }> = Omit<
	SeedDev<T>,
	'activityId'
>;

export const activities: SeedDev<
	Omit<Prisma.ActivityCreateManyInput, 'sectionId' | 'createdAt'>
>[] = [
	{
		type: ActivityType.RESOURCE,
		name: 'Materiale partial',
		description:
			'M-am gandit ca v-ar ajuta sa grupez si sa ordonez toate materialele de care veti avea nevoie pentru partialul care va urma. Mai jos veti gasi toate cursurile si seminariile incarcate pana acum + cateva propuneri de exercitii.',
		files: [
			'_development/activities/resource/Curs1.pdf',
			'_development/activities/resource/Curs2.pdf',
			'_development/activities/resource/Curs3.pdf',
			'_development/activities/resource/Curs4.docx',
			'_development/activities/resource/Curs5.docx',
			'_development/activities/resource/Seminar1.pdf',
			'_development/activities/resource/Seminar2.pdf',
			'_development/activities/resource/Exercitii-Propuse.pdf'
		]
	},
	{
		type: ActivityType.ASSIGNMENT,
		name: 'Referat Laborator 1',
		description:
			'Referatul unei lucrari va fi alcatuit dintr-un singur fisier pdf numit astfel: "NumePrenume_grupa_TitlulLucrariiPeScurt". Referatul va contine: pre-referatul (max 2 pagini, pe prima pagina apar urmatoarele: Numele, Prenumele, Grupa, Data, Titlul lucrarii), tabelul de date, graficele (daca este cazul), foi cu prelucrari si rezultatele finale. Mai jos veti gasi platforma de laborator 1.',
		files: ['_development/activities/assignment/Laborator1.pdf']
	},
	{
		type: ActivityType.QUIZ,
		name: 'Examen Partial',
		description:
			'Examenul este alcatuit din 20 de intrebari la care va trebui sa raspundeti in 90 de minute. Mai jos gasiti atasate tabele si diagrame care va pot fi de folos in rezolvare.',
		files: [
			'_development/activities/quiz/Tabel1.pdf',
			'_development/activities/quiz/Tabel2.docx',
			'_development/activities/quiz/Tabel3.xlsx',
			'_development/activities/quiz/Diagrama1.png',
			'_development/activities/quiz/Diagrama2.png'
		]
	},
	{
		type: ActivityType.FORUM,
		name: 'Propuneri imbunatatire laborator',
		description: 'Ce propuneri de imbunatatire al laboratorului ati avea?'
	}
];

export const resourceActivity: SpecificActivity<Prisma.ResourceCreateManyInput> = {};
export const assignmentActivity: SpecificActivity<Prisma.AssignmentCreateManyInput> = {
	deadline: new Date(),
	maxGrade: 30
};
const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
export const quizActivity: SpecificActivity<Prisma.QuizCreateManyInput> = {
	visible: true,
	shuffleQuestions: true,
	shuffleAnswers: true,
	timeOpen: new Date(),
	timeClose: new Date(Date.now() + HOUR_IN_MILLISECONDS * 2),
	timeLimit: HOUR_IN_MILLISECONDS * 1.5
};
export const forumActivity: SpecificActivity<
	Omit<Prisma.ForumCreateManyInput, 'universityUserId'>
> = {};
