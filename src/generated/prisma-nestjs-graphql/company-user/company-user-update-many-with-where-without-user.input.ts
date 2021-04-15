import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserScalarWhereInput } from './company-user-scalar-where.input';
import { CompanyUserUpdateManyMutationInput } from './company-user-update-many-mutation.input';

@InputType()
export class CompanyUserUpdateManyWithWhereWithoutUserInput {
    @Field(() => CompanyUserScalarWhereInput, {nullable:false})
    where!: CompanyUserScalarWhereInput;

    @Field(() => CompanyUserUpdateManyMutationInput, {nullable:false})
    data!: CompanyUserUpdateManyMutationInput;
}
