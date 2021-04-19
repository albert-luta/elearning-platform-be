import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeWhereInput } from './scope-where.input';

@InputType()
export class ScopeListRelationFilter {
    @Field(() => ScopeWhereInput, {nullable:true})
    every?: ScopeWhereInput;

    @Field(() => ScopeWhereInput, {nullable:true})
    some?: ScopeWhereInput;

    @Field(() => ScopeWhereInput, {nullable:true})
    none?: ScopeWhereInput;
}
