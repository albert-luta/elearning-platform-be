import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableBytesFieldUpdateOperationsInput } from '../prisma/nullable-bytes-field-update-operations.input';
import { CompanyUserUpdateManyWithoutCompanyInput } from '../company-user/company-user-update-many-without-company.input';

@InputType()
export class CompanyUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableBytesFieldUpdateOperationsInput, {nullable:true})
    logo?: NullableBytesFieldUpdateOperationsInput;

    @Field(() => CompanyUserUpdateManyWithoutCompanyInput, {nullable:true})
    companyUser?: CompanyUserUpdateManyWithoutCompanyInput;
}
