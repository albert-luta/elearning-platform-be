import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserCreateManyInput } from './company-user-create-many.input';

@ArgsType()
export class CreateManyCompanyUserArgs {
    @Field(() => [CompanyUserCreateManyInput], {nullable:false})
    data!: Array<CompanyUserCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
