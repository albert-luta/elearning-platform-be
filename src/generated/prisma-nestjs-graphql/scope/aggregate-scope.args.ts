import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeWhereInput } from './scope-where.input';
import { ScopeOrderByInput } from './scope-order-by.input';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ScopeCountAggregateInput } from './scope-count-aggregate.input';
import { ScopeMinAggregateInput } from './scope-min-aggregate.input';
import { ScopeMaxAggregateInput } from './scope-max-aggregate.input';

@ArgsType()
export class AggregateScopeArgs {
    @Field(() => ScopeWhereInput, {nullable:true})
    where?: ScopeWhereInput;

    @Field(() => [ScopeOrderByInput], {nullable:true})
    orderBy?: Array<ScopeOrderByInput>;

    @Field(() => ScopeWhereUniqueInput, {nullable:true})
    cursor?: ScopeWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => ScopeCountAggregateInput, {nullable:true})
    count?: ScopeCountAggregateInput;

    @Field(() => ScopeMinAggregateInput, {nullable:true})
    min?: ScopeMinAggregateInput;

    @Field(() => ScopeMaxAggregateInput, {nullable:true})
    max?: ScopeMaxAggregateInput;
}
