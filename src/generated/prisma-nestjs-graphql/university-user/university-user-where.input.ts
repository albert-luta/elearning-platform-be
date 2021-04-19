import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { UniversityRelationFilter } from '../university/university-relation-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { RoleRelationFilter } from '../role/role-relation-filter.input';

@InputType()
export class UniversityUserWhereInput {
    @Field(() => [UniversityUserWhereInput], {nullable:true})
    AND?: Array<UniversityUserWhereInput>;

    @Field(() => [UniversityUserWhereInput], {nullable:true})
    OR?: Array<UniversityUserWhereInput>;

    @Field(() => [UniversityUserWhereInput], {nullable:true})
    NOT?: Array<UniversityUserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    universityId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    roleId?: StringFilter;

    @Field(() => UniversityRelationFilter, {nullable:true})
    university?: UniversityRelationFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => RoleRelationFilter, {nullable:true})
    role?: RoleRelationFilter;
}
