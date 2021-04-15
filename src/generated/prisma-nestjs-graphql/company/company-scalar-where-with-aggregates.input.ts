import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BytesNullableWithAggregatesFilter } from '../prisma/bytes-nullable-with-aggregates-filter.input';

@InputType()
export class CompanyScalarWhereWithAggregatesInput {
    @Field(() => [CompanyScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CompanyScalarWhereWithAggregatesInput>;

    @Field(() => [CompanyScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CompanyScalarWhereWithAggregatesInput>;

    @Field(() => [CompanyScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CompanyScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => BytesNullableWithAggregatesFilter, {nullable:true})
    logo?: BytesNullableWithAggregatesFilter;
}
