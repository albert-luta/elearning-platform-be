import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyWhereInput } from './company-where.input';

@ArgsType()
export class DeleteManyCompanyArgs {
    @Field(() => CompanyWhereInput, {nullable:true})
    where?: CompanyWhereInput;
}
