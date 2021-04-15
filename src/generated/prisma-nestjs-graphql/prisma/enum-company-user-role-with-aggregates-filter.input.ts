import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';
import { NestedEnumCompanyUserRoleWithAggregatesFilter } from './nested-enum-company-user-role-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumCompanyUserRoleFilter } from './nested-enum-company-user-role-filter.input';

@InputType()
export class EnumCompanyUserRoleWithAggregatesFilter {
    @Field(() => CompanyUserRole, {nullable:true})
    equals?: CompanyUserRole;

    @Field(() => [CompanyUserRole], {nullable:true})
    in?: Array<CompanyUserRole>;

    @Field(() => [CompanyUserRole], {nullable:true})
    notIn?: Array<CompanyUserRole>;

    @Field(() => NestedEnumCompanyUserRoleWithAggregatesFilter, {nullable:true})
    not?: NestedEnumCompanyUserRoleWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    count?: NestedIntFilter;

    @Field(() => NestedEnumCompanyUserRoleFilter, {nullable:true})
    min?: NestedEnumCompanyUserRoleFilter;

    @Field(() => NestedEnumCompanyUserRoleFilter, {nullable:true})
    max?: NestedEnumCompanyUserRoleFilter;
}
