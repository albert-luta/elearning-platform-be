import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumCompanyUserRoleWithAggregatesFilter } from '../prisma/enum-company-user-role-with-aggregates-filter.input';

@InputType()
export class CompanyUserScalarWhereWithAggregatesInput {
    @Field(() => [CompanyUserScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CompanyUserScalarWhereWithAggregatesInput>;

    @Field(() => [CompanyUserScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CompanyUserScalarWhereWithAggregatesInput>;

    @Field(() => [CompanyUserScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CompanyUserScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    companyId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: StringWithAggregatesFilter;

    @Field(() => EnumCompanyUserRoleWithAggregatesFilter, {nullable:true})
    role?: EnumCompanyUserRoleWithAggregatesFilter;
}
