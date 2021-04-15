import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { CompanyRelationFilter } from '../company/company-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { EnumCompanyUserRoleFilter } from '../prisma/enum-company-user-role-filter.input';

@InputType()
export class CompanyUserWhereInput {
    @Field(() => [CompanyUserWhereInput], {nullable:true})
    AND?: Array<CompanyUserWhereInput>;

    @Field(() => [CompanyUserWhereInput], {nullable:true})
    OR?: Array<CompanyUserWhereInput>;

    @Field(() => [CompanyUserWhereInput], {nullable:true})
    NOT?: Array<CompanyUserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => CompanyRelationFilter, {nullable:true})
    company?: CompanyRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    companyId?: StringFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => EnumCompanyUserRoleFilter, {nullable:true})
    role?: EnumCompanyUserRoleFilter;
}
