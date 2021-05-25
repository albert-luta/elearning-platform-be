import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUniversityInput } from './create-university.input';

@InputType()
export class UpdateUniversityInput extends PartialType(CreateUniversityInput) {}
