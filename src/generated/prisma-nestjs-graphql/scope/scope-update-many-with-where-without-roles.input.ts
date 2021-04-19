import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeScalarWhereInput } from './scope-scalar-where.input';
import { ScopeUpdateManyMutationInput } from './scope-update-many-mutation.input';

@InputType()
export class ScopeUpdateManyWithWhereWithoutRolesInput {
    @Field(() => ScopeScalarWhereInput, {nullable:false})
    where!: ScopeScalarWhereInput;

    @Field(() => ScopeUpdateManyMutationInput, {nullable:false})
    data!: ScopeUpdateManyMutationInput;
}
