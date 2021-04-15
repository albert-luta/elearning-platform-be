import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserCreateWithoutUserInput } from './company-user-create-without-user.input';

@InputType()
export class CompanyUserCreateOrConnectWithoutUserInput {
    @Field(() => CompanyUserWhereUniqueInput, {nullable:false})
    where!: CompanyUserWhereUniqueInput;

    @Field(() => CompanyUserCreateWithoutUserInput, {nullable:false})
    create!: CompanyUserCreateWithoutUserInput;
}
