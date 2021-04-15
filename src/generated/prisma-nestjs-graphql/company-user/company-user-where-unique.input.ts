import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCompanyIdUserIdCompoundUniqueInput } from '../prisma/company-user-company-id-user-id-compound-unique.input';

@InputType()
export class CompanyUserWhereUniqueInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CompanyUserCompanyIdUserIdCompoundUniqueInput, {nullable:true})
    companyId_userId?: CompanyUserCompanyIdUserIdCompoundUniqueInput;
}
