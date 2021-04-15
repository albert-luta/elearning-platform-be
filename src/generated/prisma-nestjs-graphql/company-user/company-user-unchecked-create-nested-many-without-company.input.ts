import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateWithoutCompanyInput } from './company-user-create-without-company.input';
import { CompanyUserCreateOrConnectWithoutCompanyInput } from './company-user-create-or-connect-without-company.input';
import { CompanyUserCreateManyCompanyInputEnvelope } from './company-user-create-many-company-input-envelope.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';

@InputType()
export class CompanyUserUncheckedCreateNestedManyWithoutCompanyInput {
    @Field(() => [CompanyUserCreateWithoutCompanyInput], {nullable:true})
    create?: Array<CompanyUserCreateWithoutCompanyInput>;

    @Field(() => [CompanyUserCreateOrConnectWithoutCompanyInput], {nullable:true})
    connectOrCreate?: Array<CompanyUserCreateOrConnectWithoutCompanyInput>;

    @Field(() => CompanyUserCreateManyCompanyInputEnvelope, {nullable:true})
    createMany?: CompanyUserCreateManyCompanyInputEnvelope;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    connect?: Array<CompanyUserWhereUniqueInput>;
}
