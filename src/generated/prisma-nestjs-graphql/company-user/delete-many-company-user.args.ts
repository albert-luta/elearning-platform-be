import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserWhereInput } from './company-user-where.input';

@ArgsType()
export class DeleteManyCompanyUserArgs {
    @Field(() => CompanyUserWhereInput, {nullable:true})
    where?: CompanyUserWhereInput;
}
