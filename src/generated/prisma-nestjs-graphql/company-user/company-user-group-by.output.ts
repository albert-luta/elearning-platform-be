import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';
import { CompanyUserCountAggregate } from './company-user-count-aggregate.output';
import { CompanyUserMinAggregate } from './company-user-min-aggregate.output';
import { CompanyUserMaxAggregate } from './company-user-max-aggregate.output';

@ObjectType()
export class CompanyUserGroupBy {
    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    companyId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;

    @Field(() => CompanyUserCountAggregate, {nullable:true})
    count?: CompanyUserCountAggregate;

    @Field(() => CompanyUserMinAggregate, {nullable:true})
    min?: CompanyUserMinAggregate;

    @Field(() => CompanyUserMaxAggregate, {nullable:true})
    max?: CompanyUserMaxAggregate;
}
