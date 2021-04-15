import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUpdateInput } from './company-update.input';
import { CompanyWhereUniqueInput } from './company-where-unique.input';

@ArgsType()
export class UpdateOneCompanyArgs {
    @Field(() => CompanyUpdateInput, {nullable:false})
    data!: CompanyUpdateInput;

    @Field(() => CompanyWhereUniqueInput, {nullable:false})
    where!: CompanyWhereUniqueInput;
}
