import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutScopesInput } from './role-create-without-scopes.input';
import { RoleCreateOrConnectWithoutScopesInput } from './role-create-or-connect-without-scopes.input';
import { RoleUpsertWithWhereUniqueWithoutScopesInput } from './role-upsert-with-where-unique-without-scopes.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleUpdateWithWhereUniqueWithoutScopesInput } from './role-update-with-where-unique-without-scopes.input';
import { RoleUpdateManyWithWhereWithoutScopesInput } from './role-update-many-with-where-without-scopes.input';
import { RoleScalarWhereInput } from './role-scalar-where.input';

@InputType()
export class RoleUpdateManyWithoutScopesInput {
    @Field(() => [RoleCreateWithoutScopesInput], {nullable:true})
    create?: Array<RoleCreateWithoutScopesInput>;

    @Field(() => [RoleCreateOrConnectWithoutScopesInput], {nullable:true})
    connectOrCreate?: Array<RoleCreateOrConnectWithoutScopesInput>;

    @Field(() => [RoleUpsertWithWhereUniqueWithoutScopesInput], {nullable:true})
    upsert?: Array<RoleUpsertWithWhereUniqueWithoutScopesInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    connect?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    set?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    disconnect?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleWhereUniqueInput], {nullable:true})
    delete?: Array<RoleWhereUniqueInput>;

    @Field(() => [RoleUpdateWithWhereUniqueWithoutScopesInput], {nullable:true})
    update?: Array<RoleUpdateWithWhereUniqueWithoutScopesInput>;

    @Field(() => [RoleUpdateManyWithWhereWithoutScopesInput], {nullable:true})
    updateMany?: Array<RoleUpdateManyWithWhereWithoutScopesInput>;

    @Field(() => [RoleScalarWhereInput], {nullable:true})
    deleteMany?: Array<RoleScalarWhereInput>;
}
