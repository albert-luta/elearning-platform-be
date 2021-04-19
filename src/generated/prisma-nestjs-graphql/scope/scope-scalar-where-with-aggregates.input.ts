import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ScopeScalarWhereWithAggregatesInput {
    @Field(() => [ScopeScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ScopeScalarWhereWithAggregatesInput>;

    @Field(() => [ScopeScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ScopeScalarWhereWithAggregatesInput>;

    @Field(() => [ScopeScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ScopeScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;
}
