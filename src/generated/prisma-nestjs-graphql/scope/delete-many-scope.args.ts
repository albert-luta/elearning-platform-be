import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeWhereInput } from './scope-where.input';

@ArgsType()
export class DeleteManyScopeArgs {
    @Field(() => ScopeWhereInput, {nullable:true})
    where?: ScopeWhereInput;
}
