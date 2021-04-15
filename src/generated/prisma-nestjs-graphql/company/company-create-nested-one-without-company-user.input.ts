import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyCreateWithoutCompanyUserInput } from './company-create-without-company-user.input';
import { CompanyCreateOrConnectWithoutCompanyUserInput } from './company-create-or-connect-without-company-user.input';
import { CompanyWhereUniqueInput } from './company-where-unique.input';

@InputType()
export class CompanyCreateNestedOneWithoutCompanyUserInput {
    @Field(() => CompanyCreateWithoutCompanyUserInput, {nullable:true})
    create?: CompanyCreateWithoutCompanyUserInput;

    @Field(() => CompanyCreateOrConnectWithoutCompanyUserInput, {nullable:true})
    connectOrCreate?: CompanyCreateOrConnectWithoutCompanyUserInput;

    @Field(() => CompanyWhereUniqueInput, {nullable:true})
    connect?: CompanyWhereUniqueInput;
}
