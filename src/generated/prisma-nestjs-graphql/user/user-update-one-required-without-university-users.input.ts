import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUniversityUsersInput } from './user-create-without-university-users.input';
import { UserCreateOrConnectWithoutUniversityUsersInput } from './user-create-or-connect-without-university-users.input';
import { UserUpsertWithoutUniversityUsersInput } from './user-upsert-without-university-users.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutUniversityUsersInput } from './user-update-without-university-users.input';

@InputType()
export class UserUpdateOneRequiredWithoutUniversityUsersInput {
    @Field(() => UserCreateWithoutUniversityUsersInput, {nullable:true})
    create?: UserCreateWithoutUniversityUsersInput;

    @Field(() => UserCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => UserUpsertWithoutUniversityUsersInput, {nullable:true})
    upsert?: UserUpsertWithoutUniversityUsersInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutUniversityUsersInput, {nullable:true})
    update?: UserUpdateWithoutUniversityUsersInput;
}
