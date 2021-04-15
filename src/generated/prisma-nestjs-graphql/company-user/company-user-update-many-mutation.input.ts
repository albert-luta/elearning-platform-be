import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumCompanyUserRoleFieldUpdateOperationsInput } from '../prisma/enum-company-user-role-field-update-operations.input';

@InputType()
export class CompanyUserUpdateManyMutationInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => EnumCompanyUserRoleFieldUpdateOperationsInput, {nullable:true})
    role?: EnumCompanyUserRoleFieldUpdateOperationsInput;
}
