import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUniversityUsersInput } from './user-create-without-university-users.input';
import { UserCreateOrConnectWithoutUniversityUsersInput } from './user-create-or-connect-without-university-users.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutUniversityUsersInput {
    @Field(() => UserCreateWithoutUniversityUsersInput, {nullable:true})
    create?: UserCreateWithoutUniversityUsersInput;

    @Field(() => UserCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;
}
