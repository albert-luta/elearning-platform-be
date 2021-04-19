import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UniversityUser } from '../university-user/university-user.model';

@ObjectType()
export class University {
    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: string;

    @Field(() => [UniversityUser], {nullable:true})
    universityUsers?: Array<UniversityUser>;
}
