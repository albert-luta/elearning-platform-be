import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';

@InputType()
export class CompanyUserUncheckedCreateWithoutUserInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    companyId!: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;
}
