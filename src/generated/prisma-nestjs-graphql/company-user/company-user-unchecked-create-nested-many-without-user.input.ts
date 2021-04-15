import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateWithoutUserInput } from './company-user-create-without-user.input';
import { CompanyUserCreateOrConnectWithoutUserInput } from './company-user-create-or-connect-without-user.input';
import { CompanyUserCreateManyUserInputEnvelope } from './company-user-create-many-user-input-envelope.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';

@InputType()
export class CompanyUserUncheckedCreateNestedManyWithoutUserInput {
    @Field(() => [CompanyUserCreateWithoutUserInput], {nullable:true})
    create?: Array<CompanyUserCreateWithoutUserInput>;

    @Field(() => [CompanyUserCreateOrConnectWithoutUserInput], {nullable:true})
    connectOrCreate?: Array<CompanyUserCreateOrConnectWithoutUserInput>;

    @Field(() => CompanyUserCreateManyUserInputEnvelope, {nullable:true})
    createMany?: CompanyUserCreateManyUserInputEnvelope;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    connect?: Array<CompanyUserWhereUniqueInput>;
}
