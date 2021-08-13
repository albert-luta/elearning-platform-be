import { Field, InputType } from '@nestjs/graphql';
import { SubmitMyQuizQuestionInput } from './submit-my-quiz-question.input';

@InputType()
export class SubmitMyQuizInput {
	@Field(() => [SubmitMyQuizQuestionInput])
	questions: SubmitMyQuizQuestionInput[];
}
