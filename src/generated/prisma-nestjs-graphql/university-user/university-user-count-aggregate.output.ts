import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UniversityUserCountAggregate {
    @Field(() => Int, {nullable:true})
    universityId?: number;

    @Field(() => Int, {nullable:true})
    userId?: number;

    @Field(() => Int, {nullable:true})
    roleId?: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
