import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyUserCountAggregate {
    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    companyId?: number;

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => Int, {nullable:true})
    role?: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
