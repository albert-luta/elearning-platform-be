import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithoutUserInput } from './company-user-update-without-user.input';
import { CompanyUserCreateWithoutUserInput } from './company-user-create-without-user.input';

@InputType()
export class CompanyUserUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserUpdateWithoutUserInput, {nullable:false})
    update!: CompanyUserUpdateWithoutUserInput;

    @Field(() => CompanyUserCreateWithoutUserInput, {nullable:false})
    create!: CompanyUserCreateWithoutUserInput;
}
