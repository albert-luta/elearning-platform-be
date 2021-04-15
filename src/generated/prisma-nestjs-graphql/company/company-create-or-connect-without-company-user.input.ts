import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyWhereUniqueInput } from './company-where-unique.input';
import { CompanyCreateWithoutCompanyUserInput } from './company-create-without-company-user.input';

@InputType()
export class CompanyCreateOrConnectWithoutCompanyUserInput {
    @Field(() => CompanyWhereUniqueInput, {nullable:false})
    where!: CompanyWhereUniqueInput;

    @Field(() => CompanyCreateWithoutCompanyUserInput, {nullable:false})
    create!: CompanyCreateWithoutCompanyUserInput;
}
