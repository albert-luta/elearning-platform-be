import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyCreateWithoutCompanyUserInput } from './company-create-without-company-user.input';
import { CompanyCreateOrConnectWithoutCompanyUserInput } from './company-create-or-connect-without-company-user.input';
import { CompanyUpsertWithoutCompanyUserInput } from './company-upsert-without-company-user.input';
import { CompanyWhereUniqueInput } from './company-where-unique.input';
import { CompanyUpdateWithoutCompanyUserInput } from './company-update-without-company-user.input';

@InputType()
export class CompanyUpdateOneRequiredWithoutCompanyUserInput {
    @Field(() => CompanyCreateWithoutCompanyUserInput, {nullable:true})
    create?: CompanyCreateWithoutCompanyUserInput;

    @Field(() => CompanyCreateOrConnectWithoutCompanyUserInput, {nullable:true})
    connectOrCreate?: CompanyCreateOrConnectWithoutCompanyUserInput;

    @Field(() => CompanyUpsertWithoutCompanyUserInput, {nullable:true})
    upsert?: CompanyUpsertWithoutCompanyUserInput;

    @Field(() => CompanyWhereUniqueInput, {nullable:true})
    connect?: CompanyWhereUniqueInput;

    @Field(() => CompanyUpdateWithoutCompanyUserInput, {nullable:true})
    update?: CompanyUpdateWithoutCompanyUserInput;
}
