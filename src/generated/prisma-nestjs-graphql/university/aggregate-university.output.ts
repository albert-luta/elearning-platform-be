import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { UniversityCountAggregate } from './university-count-aggregate.output';
import { UniversityMinAggregate } from './university-min-aggregate.output';
import { UniversityMaxAggregate } from './university-max-aggregate.output';

@ObjectType()
export class AggregateUniversity {
    @Field(() => UniversityCountAggregate, {nullable:true})
    count?: UniversityCountAggregate;

    @Field(() => UniversityMinAggregate, {nullable:true})
    min?: UniversityMinAggregate;

    @Field(() => UniversityMaxAggregate, {nullable:true})
    max?: UniversityMaxAggregate;
}
