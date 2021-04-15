import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateWithoutUserInput } from './company-user-create-without-user.input';
import { CompanyUserCreateOrConnectWithoutUserInput } from './company-user-create-or-connect-without-user.input';
import { CompanyUserUpsertWithWhereUniqueWithoutUserInput } from './company-user-upsert-with-where-unique-without-user.input';
import { CompanyUserCreateManyUserInputEnvelope } from './company-user-create-many-user-input-envelope.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithWhereUniqueWithoutUserInput } from './company-user-update-with-where-unique-without-user.input';
import { CompanyUserUpdateManyWithWhereWithoutUserInput } from './company-user-update-many-with-where-without-user.input';
import { CompanyUserScalarWhereInput } from './company-user-scalar-where.input';

@InputType()
export class CompanyUserUncheckedUpdateManyWithoutUserInput {
    @Field(() => [CompanyUserCreateWithoutUserInput], {nullable:true})
    create?: Array<CompanyUserCreateWithoutUserInput>;

    @Field(() => [CompanyUserCreateOrConnectWithoutUserInput], {nullable:true})
    connectOrCreate?: Array<CompanyUserCreateOrConnectWithoutUserInput>;

    @Field(() => [CompanyUserUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    upsert?: Array<CompanyUserUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CompanyUserCreateManyUserInputEnvelope, {nullable:true})
    createMany?: CompanyUserCreateManyUserInputEnvelope;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    connect?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    set?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    disconnect?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    delete?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    update?: Array<CompanyUserUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CompanyUserUpdateManyWithWhereWithoutUserInput], {nullable:true})
    updateMany?: Array<CompanyUserUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CompanyUserScalarWhereInput], {nullable:true})
    deleteMany?: Array<CompanyUserScalarWhereInput>;
}
