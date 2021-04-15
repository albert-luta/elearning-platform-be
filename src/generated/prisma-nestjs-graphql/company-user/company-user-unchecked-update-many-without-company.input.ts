import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CompanyUserCreateWithoutCompanyInput } from './company-user-create-without-company.input';
import { CompanyUserCreateOrConnectWithoutCompanyInput } from './company-user-create-or-connect-without-company.input';
import { CompanyUserUpsertWithWhereUniqueWithoutCompanyInput } from './company-user-upsert-with-where-unique-without-company.input';
import { CompanyUserCreateManyCompanyInputEnvelope } from './company-user-create-many-company-input-envelope.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { CompanyUserUpdateWithWhereUniqueWithoutCompanyInput } from './company-user-update-with-where-unique-without-company.input';
import { CompanyUserUpdateManyWithWhereWithoutCompanyInput } from './company-user-update-many-with-where-without-company.input';
import { CompanyUserScalarWhereInput } from './company-user-scalar-where.input';

@InputType()
export class CompanyUserUncheckedUpdateManyWithoutCompanyInput {
    @Field(() => [CompanyUserCreateWithoutCompanyInput], {nullable:true})
    create?: Array<CompanyUserCreateWithoutCompanyInput>;

    @Field(() => [CompanyUserCreateOrConnectWithoutCompanyInput], {nullable:true})
    connectOrCreate?: Array<CompanyUserCreateOrConnectWithoutCompanyInput>;

    @Field(() => [CompanyUserUpsertWithWhereUniqueWithoutCompanyInput], {nullable:true})
    upsert?: Array<CompanyUserUpsertWithWhereUniqueWithoutCompanyInput>;

    @Field(() => CompanyUserCreateManyCompanyInputEnvelope, {nullable:true})
    createMany?: CompanyUserCreateManyCompanyInputEnvelope;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    connect?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    set?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    disconnect?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserWhereUniqueInput], {nullable:true})
    delete?: Array<CompanyUserWhereUniqueInput>;

    @Field(() => [CompanyUserUpdateWithWhereUniqueWithoutCompanyInput], {nullable:true})
    update?: Array<CompanyUserUpdateWithWhereUniqueWithoutCompanyInput>;

    @Field(() => [CompanyUserUpdateManyWithWhereWithoutCompanyInput], {nullable:true})
    updateMany?: Array<CompanyUserUpdateManyWithWhereWithoutCompanyInput>;

    @Field(() => [CompanyUserScalarWhereInput], {nullable:true})
    deleteMany?: Array<CompanyUserScalarWhereInput>;
}
