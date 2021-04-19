import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateNestedManyWithoutScopesInput } from '../role/role-create-nested-many-without-scopes.input';

@InputType()
export class ScopeCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => RoleCreateNestedManyWithoutScopesInput, {nullable:true})
    roles?: RoleCreateNestedManyWithoutScopesInput;
}
