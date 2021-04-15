import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithoutUserInput } from './company-user-update-without-user.input';

@InputType()
export class CompanyUserUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserUpdateWithoutUserInput, {nullable:false})
    data!: CompanyUserUpdateWithoutUserInput;
}
