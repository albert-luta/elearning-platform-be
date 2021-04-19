import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UserCountAggregate } from './user-count-aggregate.output';
import { UserMinAggregate } from './user-min-aggregate.output';
import { UserMaxAggregate } from './user-max-aggregate.output';

@ObjectType()
export class UserGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    firstName!: string;

    @Field(() => String, {nullable:false})
    lastName!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    avatar?: string;

    @Field(() => String, {nullable:false})
    fatherInitial!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => UserCountAggregate, {nullable:true})
    count?: UserCountAggregate;

    @Field(() => UserMinAggregate, {nullable:true})
    min?: UserMinAggregate;

    @Field(() => UserMaxAggregate, {nullable:true})
    max?: UserMaxAggregate;
}
