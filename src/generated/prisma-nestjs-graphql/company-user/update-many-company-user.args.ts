import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserUpdateManyMutationInput } from './company-user-update-many-mutation.input';
import { CompanyUserWhereInput } from './company-user-where.input';

@ArgsType()
export class UpdateManyCompanyUserArgs {
    @Field(() => CompanyUserUpdateManyMutationInput, {nullable:false})
    data!: CompanyUserUpdateManyMutationInput;

    @Field(() => CompanyUserWhereInput, {nullable:true})
    where?: CompanyUserWhereInput;
}
