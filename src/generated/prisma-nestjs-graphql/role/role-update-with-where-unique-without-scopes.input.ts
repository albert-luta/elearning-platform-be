import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleUpdateWithoutScopesInput } from './role-update-without-scopes.input';

@InputType()
export class RoleUpdateWithWhereUniqueWithoutScopesInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    where!: RoleWhereUniqueInput;

    @Field(() => RoleUpdateWithoutScopesInput, {nullable:false})
    data!: RoleUpdateWithoutScopesInput;
}
