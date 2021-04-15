import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';

@ArgsType()
export class FindUniqueCompanyUserArgs {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;
}
