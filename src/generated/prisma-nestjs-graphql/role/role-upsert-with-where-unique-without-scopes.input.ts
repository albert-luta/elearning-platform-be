import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleUpdateWithoutScopesInput } from './role-update-without-scopes.input';
import { RoleCreateWithoutScopesInput } from './role-create-without-scopes.input';

@InputType()
export class RoleUpsertWithWhereUniqueWithoutScopesInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    where!: RoleWhereUniqueInput;

    @Field(() => RoleUpdateWithoutScopesInput, {nullable:false})
    update!: RoleUpdateWithoutScopesInput;

    @Field(() => RoleCreateWithoutScopesInput, {nullable:false})
    create!: RoleCreateWithoutScopesInput;
}
