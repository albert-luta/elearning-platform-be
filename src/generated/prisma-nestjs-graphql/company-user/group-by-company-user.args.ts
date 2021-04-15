import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserWhereInput } from './company-user-where.input';
import { CompanyUserOrderByInput } from './company-user-order-by.input';
import { CompanyUserScalarFieldEnum } from './company-user-scalar-field.enum';
import { CompanyUserScalarWhereWithAggregatesInput } from './company-user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CompanyUserCountAggregateInput } from './company-user-count-aggregate.input';
import { CompanyUserMinAggregateInput } from './company-user-min-aggregate.input';
import { CompanyUserMaxAggregateInput } from './company-user-max-aggregate.input';

@ArgsType()
export class GroupByCompanyUserArgs {
    @Field(() => CompanyUserWhereInput, {nullable:true})
    where?: CompanyUserWhereInput;

    @Field(() => [CompanyUserOrderByInput], {nullable:true})
    orderBy?: Array<CompanyUserOrderByInput>;

    @Field(() => [CompanyUserScalarFieldEnum], {nullable:false})
    by!: Array<CompanyUserScalarFieldEnum>;

    @Field(() => CompanyUserScalarWhereWithAggregatesInput, {nullable:true})
    having?: CompanyUserScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CompanyUserCountAggregateInput, {nullable:true})
    count?: CompanyUserCountAggregateInput;

    @Field(() => CompanyUserMinAggregateInput, {nullable:true})
    min?: CompanyUserMinAggregateInput;

    @Field(() => CompanyUserMaxAggregateInput, {nullable:true})
    max?: CompanyUserMaxAggregateInput;
}