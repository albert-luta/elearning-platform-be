import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithoutCompanyInput } from './company-user-update-without-company.input';
import { CompanyUserCreateWithoutCompanyInput } from './company-user-create-without-company.input';

@InputType()
export class CompanyUserUpsertWithWhereUniqueWithoutCompanyInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserUpdateWithoutCompanyInput, {nullable:false})
    update!: CompanyUserUpdateWithoutCompanyInput;

    @Field(() => CompanyUserCreateWithoutCompanyInput, {nullable:false})
    create!: CompanyUserCreateWithoutCompanyInput;
}
