import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyWhereUniqueInput } from './company-where-unique.input';
import { CompanyCreateInput } from './company-create.input';
import { CompanyUpdateInput } from './company-update.input';

@ArgsType()
export class UpsertOneCompanyArgs {
    @Field(() => CompanyWhereUniqueInput, {nullable:false})
    where!: CompanyWhereUniqueInput;

    @Field(() => CompanyCreateInput, {nullable:false})
    create!: CompanyCreateInput;

    @Field(() => CompanyUpdateInput, {nullable:false})
    update!: CompanyUpdateInput;
}
