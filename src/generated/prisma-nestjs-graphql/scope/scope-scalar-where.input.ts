import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ScopeScalarWhereInput {
    @Field(() => [ScopeScalarWhereInput], {nullable:true})
    AND?: Array<ScopeScalarWhereInput>;

    @Field(() => [ScopeScalarWhereInput], {nullable:true})
    OR?: Array<ScopeScalarWhereInput>;

    @Field(() => [ScopeScalarWhereInput], {nullable:true})
    NOT?: Array<ScopeScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;
}
