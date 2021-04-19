import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ScopeWhereInput } from './scope-where.input';
import { ScopeOrderByInput } from './scope-order-by.input';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ScopeScalarFieldEnum } from './scope-scalar-field.enum';

@ArgsType()
export class FindManyScopeArgs {
    @Field(() => ScopeWhereInput, {nullable:true})
    where?: ScopeWhereInput;

    @Field(() => [ScopeOrderByInput], {nullable:true})
    orderBy?: Array<ScopeOrderByInput>;

    @Field(() => ScopeWhereUniqueInput, {nullable:true})
    cursor?: ScopeWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ScopeScalarFieldEnum], {nullable:true})
    distinct?: Array<ScopeScalarFieldEnum>;
}
