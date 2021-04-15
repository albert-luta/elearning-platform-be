import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateManyUserInput } from './company-user-create-many-user.input';

@InputType()
export class CompanyUserCreateManyUserInputEnvelope {
    @Field(() => [CompanyUserCreateManyUserInput], {nullable:false})
    data!: Array<CompanyUserCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
