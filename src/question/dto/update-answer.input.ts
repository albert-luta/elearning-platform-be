import { InputType } from '@nestjs/graphql';
import { CreateAnswerInput } from './create-answer.input';

@InputType()
export class UpdateAnswerInput extends CreateAnswerInput {}
