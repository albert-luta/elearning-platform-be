import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ScopeCountAggregate } from './scope-count-aggregate.output';
import { ScopeMinAggregate } from './scope-min-aggregate.output';
import { ScopeMaxAggregate } from './scope-max-aggregate.output';

@ObjectType()
export class ScopeGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => ScopeCountAggregate, {nullable:true})
    count?: ScopeCountAggregate;

    @Field(() => ScopeMinAggregate, {nullable:true})
    min?: ScopeMinAggregate;

    @Field(() => ScopeMaxAggregate, {nullable:true})
    max?: ScopeMaxAggregate;
}
