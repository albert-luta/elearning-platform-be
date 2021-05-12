import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UniversityUser } from '../university-user/university-user.model';

@ObjectType()
export class User {
    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    firstName!: string;

    @Field(() => String, {nullable:false})
    lastName!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    avatar!: string | null;

    @Field(() => String, {nullable:false,description:"First letter of the father's first name"})
    fatherInitial!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => [UniversityUser], {nullable:true})
    universityUsers!: Array<UniversityUser>;
}
