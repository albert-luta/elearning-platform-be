import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserCreateWithoutCompanyUserInput } from './user-create-without-company-user.input';

@InputType()
export class UserCreateOrConnectWithoutCompanyUserInput {
    @Field(() => UserWhereUniqueInput, {nullable:false})
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutCompanyUserInput, {nullable:false})
    create!: UserCreateWithoutCompanyUserInput;
}
