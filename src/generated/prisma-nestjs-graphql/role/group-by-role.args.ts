import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where.input';
import { RoleOrderByInput } from './role-order-by.input';
import { RoleScalarFieldEnum } from './role-scalar-field.enum';
import { RoleScalarWhereWithAggregatesInput } from './role-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { RoleCountAggregateInput } from './role-count-aggregate.input';
import { RoleMinAggregateInput } from './role-min-aggregate.input';
import { RoleMaxAggregateInput } from './role-max-aggregate.input';

@ArgsType()
export class GroupByRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    where?: RoleWhereInput;

    @Field(() => [RoleOrderByInput], {nullable:true})
    orderBy?: Array<RoleOrderByInput>;

    @Field(() => [RoleScalarFieldEnum], {nullable:false})
    by!: Array<RoleScalarFieldEnum>;

    @Field(() => RoleScalarWhereWithAggregatesInput, {nullable:true})
    having?: RoleScalarWhereWithAggregatesInput;

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
