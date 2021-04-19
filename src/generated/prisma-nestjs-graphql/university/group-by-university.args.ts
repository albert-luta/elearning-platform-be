import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityWhereInput } from './university-where.input';
import { UniversityOrderByInput } from './university-order-by.input';
import { UniversityScalarFieldEnum } from './university-scalar-field.enum';
import { UniversityScalarWhereWithAggregatesInput } from './university-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UniversityCountAggregateInput } from './university-count-aggregate.input';
import { UniversityMinAggregateInput } from './university-min-aggregate.input';
import { UniversityMaxAggregateInput } from './university-max-aggregate.input';

@ArgsType()
export class GroupByUniversityArgs {
    @Field(() => UniversityWhereInput, {nullable:true})
    where?: UniversityWhereInput;

    @Field(() => [UniversityOrderByInput], {nullable:true})
    orderBy?: Array<UniversityOrderByInput>;

    @Field(() => [UniversityScalarFieldEnum], {nullable:false})
    by!: Array<UniversityScalarFieldEnum>;

    @Field(() => UniversityScalarWhereWithAggregatesInput, {nullable:true})
    having?: UniversityScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UniversityCountAggregateInput, {nullable:true})
    count?: UniversityCountAggregateInput;

    @Field(() => UniversityMinAggregateInput, {nullable:true})
    min?: UniversityMinAggregateInput;

    @Field(() => UniversityMaxAggregateInput, {nullable:true})
    max?: UniversityMaxAggregateInput;
}
