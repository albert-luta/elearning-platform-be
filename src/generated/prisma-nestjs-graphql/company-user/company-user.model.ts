import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Company } from '../company/company.model';
import { User } from '../user/user.model';
import { CompanyUserRole } from '../user/company-user-role.enum';

@ObjectType()
export class CompanyUser {
    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => Company, {nullable:false})
    company!: Company;

    @Field(() => String, {nullable:false})
    companyId!: string;

    @Field(() => User, {nullable:false})
    user!: User;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;
}
