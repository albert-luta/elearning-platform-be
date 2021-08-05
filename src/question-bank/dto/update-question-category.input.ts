import { InputType } from '@nestjs/graphql';
import { CreateQuestionCategoryInput } from './create-question-category.input';

@InputType()
export class UpdateQuestionCategoryInput extends CreateQuestionCategoryInput {}
