import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableBytesFieldUpdateOperationsInput } from '../prisma/nullable-bytes-field-update-operations.input';
import { CompanyUserUncheckedUpdateManyWithoutCompanyInput } from '../company-user/company-user-unchecked-update-many-without-company.input';

@InputType()
export class CompanyUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableBytesFieldUpdateOperationsInput, {nullable:true})
    logo?: NullableBytesFieldUpdateOperationsInput;

    @Field(() => CompanyUserUncheckedUpdateManyWithoutCompanyInput, {nullable:true})
    companyUser?: CompanyUserUncheckedUpdateManyWithoutCompanyInput;
}
