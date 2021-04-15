import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { CompanyUser } from '../company-user/company-user.model';

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

    @HideField()
    password!: string;

    @Field(() => String, {nullable:false,description:"First letter of the father's first name"})
    fatherInitial!: string;

    @Field(() => [CompanyUser], {nullable:true})
    companyUser?: Array<CompanyUser>;
}
