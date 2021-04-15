import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithoutCompanyInput } from './company-user-update-without-company.input';

@InputType()
export class CompanyUserUpdateWithWhereUniqueWithoutCompanyInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserUpdateWithoutCompanyInput, {nullable:false})
    data!: CompanyUserUpdateWithoutCompanyInput;
}
