import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserCreateInput } from './company-user-create.input';

@ArgsType()
export class CreateOneCompanyUserArgs {
    @Field(() => CompanyUserCreateInput, {nullable:false})
    data!: CompanyUserCreateInput;
}
