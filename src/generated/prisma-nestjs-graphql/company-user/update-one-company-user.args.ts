import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserUpdateInput } from './company-user-update.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';

@ArgsType()
export class UpdateOneCompanyUserArgs {
    @Field(() => CompanyUserUpdateInput, {nullable:false})
    data!: CompanyUserUpdateInput;

    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;
}
