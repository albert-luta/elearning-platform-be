import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeUpdateInput } from './scope-update.input';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';

@ArgsType()
export class UpdateOneScopeArgs {
    @Field(() => ScopeUpdateInput, {nullable:false})
    data!: ScopeUpdateInput;

    @Field(() => ScopeWhereUniqueInput, {nullable:false})
    where!: ScopeWhereUniqueInput;
}
