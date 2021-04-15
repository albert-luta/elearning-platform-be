import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserRole } from '../user/company-user-role.enum';
import { UserCreateNestedOneWithoutCompanyUserInput } from '../user/user-create-nested-one-without-company-user.input';

@InputType()
export class CompanyUserCreateWithoutCompanyInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => CompanyUserRole, {nullable:false})
    role!: CompanyUserRole;

    @Field(() => UserCreateNestedOneWithoutCompanyUserInput, {nullable:false})
    user!: UserCreateNestedOneWithoutCompanyUserInput;
}
