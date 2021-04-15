import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCompanyUserInput } from './user-create-without-company-user.input';
import { UserCreateOrConnectWithoutCompanyUserInput } from './user-create-or-connect-without-company-user.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCompanyUserInput {
    @Field(() => UserCreateWithoutCompanyUserInput, {nullable:true})
    create?: UserCreateWithoutCompanyUserInput;

    @Field(() => UserCreateOrConnectWithoutCompanyUserInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutCompanyUserInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;
}
