import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCompanyUserInput } from './user-update-without-company-user.input';
import { UserCreateWithoutCompanyUserInput } from './user-create-without-company-user.input';

@InputType()
export class UserUpsertWithoutCompanyUserInput {
    @Field(() => UserUpdateWithoutCompanyUserInput, {nullable:false})
    update!: UserUpdateWithoutCompanyUserInput;

    @Field(() => UserCreateWithoutCompanyUserInput, {nullable:false})
    create!: UserCreateWithoutCompanyUserInput;
}
