import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateManyCompanyInput } from './company-user-create-many-company.input';

@InputType()
export class CompanyUserCreateManyCompanyInputEnvelope {
    @Field(() => [CompanyUserCreateManyCompanyInput], {nullable:false})
    data!: Array<CompanyUserCreateManyCompanyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
