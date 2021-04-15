import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';

@ObjectType()
export class CompanyUserMinAggregate {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    companyId?: string;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => CompanyUserRole, {nullable:true})
    role?: CompanyUserRole;
}
