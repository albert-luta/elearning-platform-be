import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserWhereInput } from './university-user-where.input';
import { UniversityUserOrderByInput } from './university-user-order-by.input';
import { UniversityUserScalarFieldEnum } from './university-user-scalar-field.enum';
import { UniversityUserScalarWhereWithAggregatesInput } from './university-user-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { UniversityUserCountAggregateInput } from './university-user-count-aggregate.input';
import { UniversityUserMinAggregateInput } from './university-user-min-aggregate.input';
import { UniversityUserMaxAggregateInput } from './university-user-max-aggregate.input';

@ArgsType()
export class GroupByUniversityUserArgs {
    @Field(() => UniversityUserWhereInput, {nullable:true})
    where?: UniversityUserWhereInput;

    @Field(() => [UniversityUserOrderByInput], {nullable:true})
    orderBy?: Array<UniversityUserOrderByInput>;

    @Field(() => [UniversityUserScalarFieldEnum], {nullable:false})
    by!: Array<UniversityUserScalarFieldEnum>;

    @Field(() => UniversityUserScalarWhereWithAggregatesInput, {nullable:true})
    having?: UniversityUserScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => UniversityUserCountAggregateInput, {nullable:true})
    count?: UniversityUserCountAggregateInput;

    @Field(() => UniversityUserMinAggregateInput, {nullable:true})
    min?: UniversityUserMinAggregateInput;

    @Field(() => UniversityUserMaxAggregateInput, {nullable:true})
    max?: UniversityUserMaxAggregateInput;
}
