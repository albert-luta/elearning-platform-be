import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumCompanyUserRoleFieldUpdateOperationsInput } from '../prisma/enum-company-user-role-field-update-operations.input';
import { CompanyUpdateOneRequiredWithoutCompanyUserInput } from '../company/company-update-one-required-without-company-user.input';
import { UserUpdateOneRequiredWithoutCompanyUserInput } from '../user/user-update-one-required-without-company-user.input';

@InputType()
export class CompanyUserUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => EnumCompanyUserRoleFieldUpdateOperationsInput, {nullable:true})
    role?: EnumCompanyUserRoleFieldUpdateOperationsInput;

    @Field(() => CompanyUpdateOneRequiredWithoutCompanyUserInput, {nullable:true})
    company?: CompanyUpdateOneRequiredWithoutCompanyUserInput;

    @Field(() => UserUpdateOneRequiredWithoutCompanyUserInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutCompanyUserInput;
}