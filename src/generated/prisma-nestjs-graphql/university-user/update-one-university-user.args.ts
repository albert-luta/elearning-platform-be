import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserUpdateInput } from './university-user-update.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';

@ArgsType()
export class UpdateOneUniversityUserArgs {
    @Field(() => UniversityUserUpdateInput, {nullable:false})
    data!: UniversityUserUpdateInput;

    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;
}
