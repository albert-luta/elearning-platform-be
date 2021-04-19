import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';

@InputType()
export class UniversityScalarWhereWithAggregatesInput {
    @Field(() => [UniversityScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UniversityScalarWhereWithAggregatesInput>;

    @Field(() => [UniversityScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UniversityScalarWhereWithAggregatesInput>;

    @Field(() => [UniversityScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UniversityScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    logo?: StringNullableWithAggregatesFilter;
}
