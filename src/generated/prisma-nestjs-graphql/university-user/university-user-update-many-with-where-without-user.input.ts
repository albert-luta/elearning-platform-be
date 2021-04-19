import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserScalarWhereInput } from './university-user-scalar-where.input';
import { UniversityUserUpdateManyMutationInput } from './university-user-update-many-mutation.input';

@InputType()
export class UniversityUserUpdateManyWithWhereWithoutUserInput {
    @Field(() => UniversityUserScalarWhereInput, {nullable:false})
    where!: UniversityUserScalarWhereInput;

    @Field(() => UniversityUserUpdateManyMutationInput, {nullable:false})
    data!: UniversityUserUpdateManyMutationInput;
}
