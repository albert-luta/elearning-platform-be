import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { RoleListRelationFilter } from '../role/role-list-relation-filter.input';

@InputType()
export class ScopeWhereInput {
    @Field(() => [ScopeWhereInput], {nullable:true})
    AND?: Array<ScopeWhereInput>;

    @Field(() => [ScopeWhereInput], {nullable:true})
    OR?: Array<ScopeWhereInput>;

    @Field(() => [ScopeWhereInput], {nullable:true})
    NOT?: Array<ScopeWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => RoleListRelationFilter, {nullable:true})
    roles?: RoleListRelationFilter;
}
