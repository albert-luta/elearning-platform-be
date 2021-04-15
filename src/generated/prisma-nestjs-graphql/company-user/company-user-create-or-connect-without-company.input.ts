import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserCreateWithoutCompanyInput } from './company-user-create-without-company.input';

@InputType()
export class CompanyUserCreateOrConnectWithoutCompanyInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserCreateWithoutCompanyInput, {nullable:false})
    create!: CompanyUserCreateWithoutCompanyInput;
}
