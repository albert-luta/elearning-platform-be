import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CompanyUserCompanyIdUserIdCompoundUniqueInput {
    @Field(() => String, {nullable:false})
    companyId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;
}
