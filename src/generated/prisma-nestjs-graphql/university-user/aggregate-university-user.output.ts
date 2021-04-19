import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UniversityUserCountAggregate } from './university-user-count-aggregate.output';
import { UniversityUserMinAggregate } from './university-user-min-aggregate.output';
import { UniversityUserMaxAggregate } from './university-user-max-aggregate.output';

@ObjectType()
export class AggregateUniversityUser {
    @Field(() => UniversityUserCountAggregate, {nullable:true})
    count?: UniversityUserCountAggregate;

    @Field(() => UniversityUserMinAggregate, {nullable:true})
    min?: UniversityUserMinAggregate;

    @Field(() => UniversityUserMaxAggregate, {nullable:true})
    max?: UniversityUserMaxAggregate;
}
