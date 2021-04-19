import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutScopesInput } from './role-create-without-scopes.input';
import { RoleCreateOrConnectWithoutScopesInput } from './role-create-or-connect-without-scopes.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateNestedManyWithoutScopesInput {
    @Field(() => [RoleCreateWithoutScopesInput], {nullable:true})
    create?: Array<RoleCreateWithoutScopesInput>;

    @Field(() => [RoleCreateOrConnectWithoutScopesInput], {nullable:true})
    connectOrCreate?: Array<RoleCreateOrConnectWithoutScopesInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    connect?: Array<RoleWhereUniqueInput>;
}
