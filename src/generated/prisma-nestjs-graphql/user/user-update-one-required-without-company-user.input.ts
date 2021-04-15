import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCompanyUserInput } from './user-create-without-company-user.input';
import { UserCreateOrConnectWithoutCompanyUserInput } from './user-create-or-connect-without-company-user.input';
import { UserUpsertWithoutCompanyUserInput } from './user-upsert-without-company-user.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutCompanyUserInput } from './user-update-without-company-user.input';

@InputType()
export class UserUpdateOneRequiredWithoutCompanyUserInput {
    @Field(() => UserCreateWithoutCompanyUserInput, {nullable:true})
    create?: UserCreateWithoutCompanyUserInput;

    @Field(() => UserCreateOrConnectWithoutCompanyUserInput, {nullable:true})
    connectOrCreate?: UserCreateOrConnectWithoutCompanyUserInput;

    @Field(() => UserUpsertWithoutCompanyUserInput, {nullable:true})
    upsert?: UserUpsertWithoutCompanyUserInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutCompanyUserInput, {nullable:true})
    update?: UserUpdateWithoutCompanyUserInput;
}
