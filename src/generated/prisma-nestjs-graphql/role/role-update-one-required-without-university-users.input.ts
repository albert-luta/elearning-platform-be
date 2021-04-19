import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleCreateWithoutUniversityUsersInput } from './role-create-without-university-users.input';
import { RoleCreateOrConnectWithoutUniversityUsersInput } from './role-create-or-connect-without-university-users.input';
import { RoleUpsertWithoutUniversityUsersInput } from './role-upsert-without-university-users.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleUpdateWithoutUniversityUsersInput } from './role-update-without-university-users.input';

@InputType()
export class RoleUpdateOneRequiredWithoutUniversityUsersInput {
    @Field(() => RoleCreateWithoutUniversityUsersInput, {nullable:true})
    create?: RoleCreateWithoutUniversityUsersInput;

    @Field(() => RoleCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: RoleCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => RoleUpsertWithoutUniversityUsersInput, {nullable:true})
    upsert?: RoleUpsertWithoutUniversityUsersInput;

    @Field(() => RoleWhereUniqueInput, {nullable:true})
    connect?: RoleWhereUniqueInput;

    @Field(() => RoleUpdateWithoutUniversityUsersInput, {nullable:true})
    update?: RoleUpdateWithoutUniversityUsersInput;
}
