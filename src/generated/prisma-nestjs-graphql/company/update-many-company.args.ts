import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUpdateManyMutationInput } from './company-update-many-mutation.input';
import { CompanyWhereInput } from './company-where.input';

@ArgsType()
export class UpdateManyCompanyArgs {
    @Field(() => CompanyUpdateManyMutationInput, {nullable:false})
    data!: CompanyUpdateManyMutationInput;

    @Field(() => CompanyWhereInput, {nullable:true})
    where?: CompanyWhereInput;
}
