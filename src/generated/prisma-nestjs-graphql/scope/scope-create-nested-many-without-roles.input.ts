import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeCreateWithoutRolesInput } from './scope-create-without-roles.input';
import { ScopeCreateOrConnectWithoutRolesInput } from './scope-create-or-connect-without-roles.input';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';

@InputType()
export class ScopeCreateNestedManyWithoutRolesInput {
    @Field(() => [ScopeCreateWithoutRolesInput], {nullable:true})
    create?: Array<ScopeCreateWithoutRolesInput>;

    @Field(() => [ScopeCreateOrConnectWithoutRolesInput], {nullable:true})
    connectOrCreate?: Array<ScopeCreateOrConnectWithoutRolesInput>;

    @Field(() => [ScopeWhereUniqueInput], {nullable:true})
    connect?: Array<ScopeWhereUniqueInput>;
}
