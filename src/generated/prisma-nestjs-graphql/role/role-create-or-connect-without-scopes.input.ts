import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleCreateWithoutScopesInput } from './role-create-without-scopes.input';

@InputType()
export class RoleCreateOrConnectWithoutScopesInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    where!: RoleWhereUniqueInput;

    @Field(() => RoleCreateWithoutScopesInput, {nullable:false})
    create!: RoleCreateWithoutScopesInput;
}
