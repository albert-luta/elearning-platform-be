import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyWhereUniqueInput } from './company-where-unique.input';

@ArgsType()
export class FindUniqueCompanyArgs {
    @Field(() => CompanyWhereUniqueInput, {nullable:false})
    where!: CompanyWhereUniqueInput;
}
