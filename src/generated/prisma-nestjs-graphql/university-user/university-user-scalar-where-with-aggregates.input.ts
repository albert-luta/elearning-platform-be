import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class UniversityUserScalarWhereWithAggregatesInput {
    @Field(() => [UniversityUserScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<UniversityUserScalarWhereWithAggregatesInput>;

    @Field(() => [UniversityUserScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<UniversityUserScalarWhereWithAggregatesInput>;

    @Field(() => [UniversityUserScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<UniversityUserScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    universityId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    roleId?: StringWithAggregatesFilter;
}
