import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';
import { NestedEnumCompanyUserRoleFilter } from './nested-enum-company-user-role-filter.input';

@InputType()
export class EnumCompanyUserRoleFilter {
    @Field(() => CompanyUserRole, {nullable:true})
    equals?: CompanyUserRole;

    @Field(() => [CompanyUserRole], {nullable:true})
    in?: Array<CompanyUserRole>;

    @Field(() => [CompanyUserRole], {nullable:true})
    notIn?: Array<CompanyUserRole>;

    @Field(() => NestedEnumCompanyUserRoleFilter, {nullable:true})
    not?: NestedEnumCompanyUserRoleFilter;
}
