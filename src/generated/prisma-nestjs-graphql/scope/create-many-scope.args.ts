import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeCreateManyInput } from './scope-create-many.input';

@ArgsType()
export class CreateManyScopeArgs {
    @Field(() => [ScopeCreateManyInput], {nullable:false})
    data!: Array<ScopeCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
