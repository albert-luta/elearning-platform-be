import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserCreateInput } from './university-user-create.input';
import { UniversityUserUpdateInput } from './university-user-update.input';

@ArgsType()
export class UpsertOneUniversityUserArgs {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserCreateInput, {nullable:false})
    create!: UniversityUserCreateInput;

    @Field(() => UniversityUserUpdateInput, {nullable:false})
    update!: UniversityUserUpdateInput;
}
