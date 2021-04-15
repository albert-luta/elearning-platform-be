import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserCreateInput } from './company-user-create.input';
import { CompanyUserUpdateInput } from './company-user-update.input';

@ArgsType()
export class UpsertOneCompanyUserArgs {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserCreateInput, {nullable:false})
    create!: CompanyUserCreateInput;

    @Field(() => CompanyUserUpdateInput, {nullable:false})
    update!: CompanyUserUpdateInput;
}
