import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutUniversityUsersInput } from './role-create-without-university-users.input';
import { RoleCreateOrConnectWithoutUniversityUsersInput } from './role-create-or-connect-without-university-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';

@InputType()
export class RoleCreateNestedOneWithoutUniversityUsersInput {
    @Field(() => RoleCreateWithoutUniversityUsersInput, {nullable:true})
    create?: RoleCreateWithoutUniversityUsersInput;

    @Field(() => RoleCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: RoleCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => RoleWhereUniqueInput, {nullable:true})
    connect?: RoleWhereUniqueInput;
}
