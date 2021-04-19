import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityCreateInput } from './university-create.input';

@ArgsType()
export class CreateOneUniversityArgs {
    @Field(() => UniversityCreateInput, {nullable:false})
    data!: UniversityCreateInput;
}
