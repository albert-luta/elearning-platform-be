import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CompanyUserCountAggregate } from './company-user-count-aggregate.output';
import { CompanyUserMinAggregate } from './company-user-min-aggregate.output';
import { CompanyUserMaxAggregate } from './company-user-max-aggregate.output';

@ObjectType()
export class AggregateCompanyUser {
    @Field(() => CompanyUserCountAggregate, {nullable:true})
    count?: CompanyUserCountAggregate;

    @Field(() => CompanyUserMinAggregate, {nullable:true})
    min?: CompanyUserMinAggregate;

    @Field(() => CompanyUserMaxAggregate, {nullable:true})
    max?: CompanyUserMaxAggregate;
}
