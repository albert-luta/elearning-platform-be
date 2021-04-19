import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserCreateWithoutUniversityUsersInput } from './user-create-without-university-users.input';

@InputType()
export class UserCreateOrConnectWithoutUniversityUsersInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutUniversityUsersInput, {nullable:false})
    create!: UserCreateWithoutUniversityUsersInput;
}
