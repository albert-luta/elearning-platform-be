import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyCreateInput } from './company-create.input';

@ArgsType()
export class CreateOneCompanyArgs {
    @Field(() => CompanyCreateInput, {nullable:false})
    data!: CompanyCreateInput;
}
