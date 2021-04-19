import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutUniversityUsersInput } from './user-update-without-university-users.input';
import { UserCreateWithoutUniversityUsersInput } from './user-create-without-university-users.input';

@InputType()
export class UserUpsertWithoutUniversityUsersInput {
    @Field(() => UserUpdateWithoutUniversityUsersInput, {nullable:false})
    update!: UserUpdateWithoutUniversityUsersInput;

    @Field(() => UserCreateWithoutUniversityUsersInput, {nullable:false})
    create!: UserCreateWithoutUniversityUsersInput;
}
