import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CompanyCountAggregate {
    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    name?: number;

    @Field(() => Int, {nullable:true})
    logo?: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
