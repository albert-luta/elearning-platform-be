import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UniversityUserListRelationFilter } from '../university-user/university-user-list-relation-filter.input';

@InputType()
export class UniversityWhereInput {
    @Field(() => [UniversityWhereInput], {nullable:true})
    AND?: Array<UniversityWhereInput>;

    @Field(() => [UniversityWhereInput], {nullable:true})
    OR?: Array<UniversityWhereInput>;

    @Field(() => [UniversityWhereInput], {nullable:true})
    NOT?: Array<UniversityWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    logo?: StringNullableFilter;

    @Field(() => UniversityUserListRelationFilter, {nullable:true})
    universityUsers?: UniversityUserListRelationFilter;
}
