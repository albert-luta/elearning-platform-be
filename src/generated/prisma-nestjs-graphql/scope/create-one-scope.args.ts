import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeCreateInput } from './scope-create.input';

@ArgsType()
export class CreateOneScopeArgs {
    @Field(() => ScopeCreateInput, {nullable:false})
    data!: ScopeCreateInput;
}
