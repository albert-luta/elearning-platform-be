import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';

@InputType()
export class EnumCompanyUserRoleFieldUpdateOperationsInput {
    @Field(() => CompanyUserRole, {nullable:true})
    set?: CompanyUserRole;
}
