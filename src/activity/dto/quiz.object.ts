import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseActivityInterface } from './base-activity.interface';
import { QuizQuestionObject } from './quiz-question.object';

@ObjectType({
	implements: () => [BaseActivityInterface]
})
export class QuizObject implements BaseActivityInterface {
	id: string;
	universityId: string;
	sectionId: string;
	createdAt: Date;
	name: string;
	description: string | null;
	files: Array<string>;
	type: string;

	@Field()
	visible: boolean;

	@Field()
	shuffleQuestions: boolean;

	@Field()
	shuffleAnswers: boolean;

	@Field()
	timeOpen: Date;

	@Field()
	timeClose: Date;

	@Field(() => Int)
	timeLimit: number;

	@Field(() => [QuizQuestionObject])
	quizQuestions: QuizQuestionObject[];
}
