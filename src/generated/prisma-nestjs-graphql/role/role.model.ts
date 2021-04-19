import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Scope } from '../scope/scope.model';
import { UniversityUser } from '../university-user/university-user.model';

@ObjectType()
export class Role {
    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => [Scope], {nullable:true})
    scopes?: Array<Scope>;

    @Field(() => [UniversityUser], {nullable:true})
    universityUsers?: Array<UniversityUser>;
}
