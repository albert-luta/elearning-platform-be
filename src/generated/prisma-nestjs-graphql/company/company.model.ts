import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { CompanyUser } from '../company-user/company-user.model';

@ObjectType()
export class Company {
    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: Buffer;

    @Field(() => [CompanyUser], {nullable:true})
    companyUser?: Array<CompanyUser>;
}
