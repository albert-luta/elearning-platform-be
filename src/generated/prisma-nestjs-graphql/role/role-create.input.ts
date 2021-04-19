import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeCreateNestedManyWithoutRolesInput } from '../scope/scope-create-nested-many-without-roles.input';
import { UniversityUserCreateNestedManyWithoutRoleInput } from '../university-user/university-user-create-nested-many-without-role.input';

@InputType()
export class RoleCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => ScopeCreateNestedManyWithoutRolesInput, {nullable:true})
    scopes?: ScopeCreateNestedManyWithoutRolesInput;

    @Field(() => UniversityUserCreateNestedManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserCreateNestedManyWithoutRoleInput;
}
