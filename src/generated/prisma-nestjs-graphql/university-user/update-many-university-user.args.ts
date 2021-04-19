import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserUpdateManyMutationInput } from './university-user-update-many-mutation.input';
import { UniversityUserWhereInput } from './university-user-where.input';

@ArgsType()
export class UpdateManyUniversityUserArgs {
    @Field(() => UniversityUserUpdateManyMutationInput, {nullable:false})
    data!: UniversityUserUpdateManyMutationInput;

    @Field(() => UniversityUserWhereInput, {nullable:true})
    where?: UniversityUserWhereInput;
}
