import { Field, InputType, OmitType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.input';
import { UpdateAnswerInput } from './update-answer.input';

@InputType()
export class UpdateQuestionInput extends OmitType(CreateQuestionInput, [
	'answers'
] as const) {
	@Field(() => [UpdateAnswerInput])
	answers: UpdateAnswerInput[];
}
