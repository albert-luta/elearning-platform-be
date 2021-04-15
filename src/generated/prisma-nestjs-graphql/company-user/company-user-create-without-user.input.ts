import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';
import { CompanyCreateNestedOneWithoutCompanyUserInput } from '../company/company-create-nested-one-without-company-user.input';

@InputType()
export class CompanyUserCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;

    @Field(() => CompanyCreateNestedOneWithoutCompanyUserInput, {nullable:false})
    company!: CompanyCreateNestedOneWithoutCompanyUserInput;
}
