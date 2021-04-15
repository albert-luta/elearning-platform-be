import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';

@ObjectType()
export class UserCountAggregate {
    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    firstName?: number;

    @Field(() => Int, {nullable:true})
    lastName?: number;

    @Field(() => Int, {nullable:true})
    email?: number;

    @HideField()
    password?: number;

    @Field(() => Int, {nullable:true})
    fatherInitial?: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
