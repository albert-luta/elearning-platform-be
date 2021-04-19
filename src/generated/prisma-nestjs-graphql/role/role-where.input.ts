import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { ScopeListRelationFilter } from '../scope/scope-list-relation-filter.input';
import { UniversityUserListRelationFilter } from '../university-user/university-user-list-relation-filter.input';

@InputType()
export class RoleWhereInput {
    @Field(() => [RoleWhereInput], {nullable:true})
    AND?: Array<RoleWhereInput>;

    @Field(() => [RoleWhereInput], {nullable:true})
    OR?: Array<RoleWhereInput>;

    @Field(() => [RoleWhereInput], {nullable:true})
    NOT?: Array<RoleWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => ScopeListRelationFilter, {nullable:true})
    scopes?: ScopeListRelationFilter;

    @Field(() => UniversityUserListRelationFilter, {nullable:true})
    universityUsers?: UniversityUserListRelationFilter;
}
