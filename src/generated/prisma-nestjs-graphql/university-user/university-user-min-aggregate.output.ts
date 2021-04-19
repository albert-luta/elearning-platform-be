import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UniversityUserMinAggregate {
    @Field(() => String, {nullable:true})
    universityId?: string;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => String, {nullable:true})
    roleId?: string;
}
