import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeCreateNestedManyWithoutRolesInput } from '../scope/scope-create-nested-many-without-roles.input';

@InputType()
export class RoleCreateWithoutUniversityUsersInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => ScopeCreateNestedManyWithoutRolesInput, {nullable:true})
    scopes?: ScopeCreateNestedManyWithoutRolesInput;
}
