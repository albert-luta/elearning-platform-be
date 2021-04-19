import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeCreateWithoutRolesInput } from './scope-create-without-roles.input';
import { ScopeCreateOrConnectWithoutRolesInput } from './scope-create-or-connect-without-roles.input';
import { ScopeUpsertWithWhereUniqueWithoutRolesInput } from './scope-upsert-with-where-unique-without-roles.input';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { ScopeUpdateWithWhereUniqueWithoutRolesInput } from './scope-update-with-where-unique-without-roles.input';
import { ScopeUpdateManyWithWhereWithoutRolesInput } from './scope-update-many-with-where-without-roles.input';
import { ScopeScalarWhereInput } from './scope-scalar-where.input';

@InputType()
export class ScopeUpdateManyWithoutRolesInput {
    @Field(() => [ScopeCreateWithoutRolesInput], {nullable:true})
    create?: Array<ScopeCreateWithoutRolesInput>;

    @Field(() => [ScopeCreateOrConnectWithoutRolesInput], {nullable:true})
    connectOrCreate?: Array<ScopeCreateOrConnectWithoutRolesInput>;

    @Field(() => [ScopeUpsertWithWhereUniqueWithoutRolesInput], {nullable:true})
    upsert?: Array<ScopeUpsertWithWhereUniqueWithoutRolesInput>;

    @Field(() => [ScopeWhereUniqueInput], {nullable:true})
    connect?: Array<ScopeWhereUniqueInput>;

    @Field(() => [ScopeWhereUniqueInput], {nullable:true})
    set?: Array<ScopeWhereUniqueInput>;

    @Field(() => [ScopeWhereUniqueInput], {nullable:true})
    disconnect?: Array<ScopeWhereUniqueInput>;

    @Field(() => [ScopeWhereUniqueInput], {nullable:true})
    delete?: Array<ScopeWhereUniqueInput>;

    @Field(() => [ScopeUpdateWithWhereUniqueWithoutRolesInput], {nullable:true})
    update?: Array<ScopeUpdateWithWhereUniqueWithoutRolesInput>;

    @Field(() => [ScopeUpdateManyWithWhereWithoutRolesInput], {nullable:true})
    updateMany?: Array<ScopeUpdateManyWithWhereWithoutRolesInput>;

    @Field(() => [ScopeScalarWhereInput], {nullable:true})
    deleteMany?: Array<ScopeScalarWhereInput>;
}
