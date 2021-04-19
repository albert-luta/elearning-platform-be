import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeUpdateManyMutationInput } from './scope-update-many-mutation.input';
import { ScopeWhereInput } from './scope-where.input';

@ArgsType()
export class UpdateManyScopeArgs {
    @Field(() => ScopeUpdateManyMutationInput, {nullable:false})
    data!: ScopeUpdateManyMutationInput;

    @Field(() => ScopeWhereInput, {nullable:true})
    where?: ScopeWhereInput;
}
