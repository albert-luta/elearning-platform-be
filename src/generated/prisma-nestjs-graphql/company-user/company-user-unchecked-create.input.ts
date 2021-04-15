import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';

@InputType()
export class CompanyUserUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    companyId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;
}
