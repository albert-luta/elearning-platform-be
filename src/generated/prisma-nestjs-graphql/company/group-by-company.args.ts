import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyWhereInput } from './company-where.input';
import { CompanyOrderByInput } from './company-order-by.input';
import { CompanyScalarFieldEnum } from './company-scalar-field.enum';
import { CompanyScalarWhereWithAggregatesInput } from './company-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CompanyCountAggregateInput } from './company-count-aggregate.input';
import { CompanyMinAggregateInput } from './company-min-aggregate.input';
import { CompanyMaxAggregateInput } from './company-max-aggregate.input';

@ArgsType()
export class GroupByCompanyArgs {
    @Field(() => CompanyWhereInput, {nullable:true})
    where?: CompanyWhereInput;

    @Field(() => [CompanyOrderByInput], {nullable:true})
    orderBy?: Array<CompanyOrderByInput>;

    @Field(() => [CompanyScalarFieldEnum], {nullable:false})
    by!: Array<CompanyScalarFieldEnum>;

    @Field(() => CompanyScalarWhereWithAggregatesInput, {nullable:true})
    having?: CompanyScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CompanyCountAggregateInput, {nullable:true})
    count?: CompanyCountAggregateInput;

    @Field(() => CompanyMinAggregateInput, {nullable:true})
    min?: CompanyMinAggregateInput;

    @Field(() => CompanyMaxAggregateInput, {nullable:true})
    max?: CompanyMaxAggregateInput;
}
