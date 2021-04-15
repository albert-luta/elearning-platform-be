import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyCreateManyInput } from './company-create-many.input';

@ArgsType()
export class CreateManyCompanyArgs {
    @Field(() => [CompanyCreateManyInput], {nullable:false})
    data!: Array<CompanyCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
