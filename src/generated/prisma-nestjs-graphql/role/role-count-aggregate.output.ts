import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RoleCountAggregate {
    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    name?: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
