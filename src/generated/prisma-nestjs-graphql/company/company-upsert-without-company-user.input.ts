import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUpdateWithoutCompanyUserInput } from './company-update-without-company-user.input';
import { CompanyCreateWithoutCompanyUserInput } from './company-create-without-company-user.input';

@InputType()
export class CompanyUpsertWithoutCompanyUserInput {
    @Field(() => CompanyUpdateWithoutCompanyUserInput, {nullable:false})
    update!: CompanyUpdateWithoutCompanyUserInput;

    @Field(() => CompanyCreateWithoutCompanyUserInput, {nullable:false})
    create!: CompanyCreateWithoutCompanyUserInput;
}
