import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EnumCompanyUserRoleFilter } from '../prisma/enum-company-user-role-filter.input';

@InputType()
export class CompanyUserScalarWhereInput {
    @Field(() => [CompanyUserScalarWhereInput], {nullable:true})
    AND?: Array<CompanyUserScalarWhereInput>;

    @Field(() => [CompanyUserScalarWhereInput], {nullable:true})
    OR?: Array<CompanyUserScalarWhereInput>;

    @Field(() => [CompanyUserScalarWhereInput], {nullable:true})
    NOT?: Array<CompanyUserScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    companyId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => EnumCompanyUserRoleFilter, {nullable:true})
    role?: EnumCompanyUserRoleFilter;
}
