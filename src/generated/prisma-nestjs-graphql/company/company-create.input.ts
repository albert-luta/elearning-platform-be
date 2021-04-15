import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateNestedManyWithoutCompanyInput } from '../company-user/company-user-create-nested-many-without-company.input';

@InputType()
export class CompanyCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: Buffer;

    @Field(() => CompanyUserCreateNestedManyWithoutCompanyInput, {nullable:true})
    companyUser?: CompanyUserCreateNestedManyWithoutCompanyInput;
}
