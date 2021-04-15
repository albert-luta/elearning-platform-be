import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumCompanyUserRoleFieldUpdateOperationsInput } from '../prisma/enum-company-user-role-field-update-operations.input';

@InputType()
export class CompanyUserUncheckedUpdateWithoutCompanyInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: StringFieldUpdateOperationsInput;

    @Field(() => EnumCompanyUserRoleFieldUpdateOperationsInput, {nullable:true})
    role?: EnumCompanyUserRoleFieldUpdateOperationsInput;
}
