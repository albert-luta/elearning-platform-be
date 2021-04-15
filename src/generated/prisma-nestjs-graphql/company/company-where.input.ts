import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { BytesNullableFilter } from '../prisma/bytes-nullable-filter.input';
import { CompanyUserListRelationFilter } from '../company-user/company-user-list-relation-filter.input';

@InputType()
export class CompanyWhereInput {
    @Field(() => [CompanyWhereInput], {nullable:true})
    AND?: Array<CompanyWhereInput>;

    @Field(() => [CompanyWhereInput], {nullable:true})
    OR?: Array<CompanyWhereInput>;

    @Field(() => [CompanyWhereInput], {nullable:true})
    NOT?: Array<CompanyWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => BytesNullableFilter, {nullable:true})
    logo?: BytesNullableFilter;

    @Field(() => CompanyUserListRelationFilter, {nullable:true})
    companyUser?: CompanyUserListRelationFilter;
}
