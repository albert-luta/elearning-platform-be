import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { ScopeCreateInput } from './scope-create.input';
import { ScopeUpdateInput } from './scope-update.input';

@ArgsType()
export class UpsertOneScopeArgs {
    @Field(() => ScopeWhereUniqueInput, {nullable:false})
    where!: ScopeWhereUniqueInput;

    @Field(() => ScopeCreateInput, {nullable:false})
    create!: ScopeCreateInput;

    @Field(() => ScopeUpdateInput, {nullable:false})
    update!: ScopeUpdateInput;
}
