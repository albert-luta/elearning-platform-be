import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyWhereInput } from './company-where.input';
import { CompanyOrderByInput } from './company-order-by.input';
import { CompanyWhereUniqueInput } from './company-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CompanyCountAggregateInput } from './company-count-aggregate.input';
import { CompanyMinAggregateInput } from './company-min-aggregate.input';
import { CompanyMaxAggregateInput } from './company-max-aggregate.input';

@ArgsType()
export class AggregateCompanyArgs {
    @Field(() => CompanyWhereInput, {nullable:true})
    where?: CompanyWhereInput;

    @Field(() => [CompanyOrderByInput], {nullable:true})
    orderBy?: Array<CompanyOrderByInput>;

    @Field(() => CompanyWhereUniqueInput, {nullable:true})
    cursor?: CompanyWhereUniqueInput;

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
