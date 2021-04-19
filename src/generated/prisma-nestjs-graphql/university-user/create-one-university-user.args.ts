import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserCreateInput } from './university-user-create.input';

@ArgsType()
export class CreateOneUniversityUserArgs {
    @Field(() => UniversityUserCreateInput, {nullable:false})
    data!: UniversityUserCreateInput;
}
