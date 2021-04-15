import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereInput } from './company-user-where.input';

@InputType()
export class CompanyUserListRelationFilter {
    @Field(() => CompanyUserWhereInput, {nullable:true})
    every?: CompanyUserWhereInput;

    @Field(() => CompanyUserWhereInput, {nullable:true})
    some?: CompanyUserWhereInput;

    @Field(() => CompanyUserWhereInput, {nullable:true})
    none?: CompanyUserWhereInput;
}
