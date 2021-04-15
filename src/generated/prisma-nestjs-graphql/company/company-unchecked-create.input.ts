import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserUncheckedCreateNestedManyWithoutCompanyInput } from '../company-user/company-user-unchecked-create-nested-many-without-company.input';

@InputType()
export class CompanyUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: Buffer;

    @Field(() => CompanyUserUncheckedCreateNestedManyWithoutCompanyInput, {nullable:true})
    companyUser?: CompanyUserUncheckedCreateNestedManyWithoutCompanyInput;
}
