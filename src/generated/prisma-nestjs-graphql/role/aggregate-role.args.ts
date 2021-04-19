import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where.input';
import { RoleOrderByInput } from './role-order-by.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RoleCountAggregateInput } from './role-count-aggregate.input';
import { RoleMinAggregateInput } from './role-min-aggregate.input';
import { RoleMaxAggregateInput } from './role-max-aggregate.input';

@ArgsType()
export class AggregateRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    where?: RoleWhereInput;

    @Field(() => [RoleOrderByInput], {nullable:true})
    orderBy?: Array<RoleOrderByInput>;

    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: RoleWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => RoleCountAggregateInput, {nullable:true})
    count?: RoleCountAggregateInput;

    @Field(() => RoleMinAggregateInput, {nullable:true})
    min?: RoleMinAggregateInput;

    @Field(() => RoleMaxAggregateInput, {nullable:true})
    max?: RoleMaxAggregateInput;
}
