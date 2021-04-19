import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutRoleInput } from './university-user-create-without-role.input';
import { UniversityUserCreateOrConnectWithoutRoleInput } from './university-user-create-or-connect-without-role.input';
import { UniversityUserUpsertWithWhereUniqueWithoutRoleInput } from './university-user-upsert-with-where-unique-without-role.input';
import { UniversityUserCreateManyRoleInputEnvelope } from './university-user-create-many-role-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithWhereUniqueWithoutRoleInput } from './university-user-update-with-where-unique-without-role.input';
import { UniversityUserUpdateManyWithWhereWithoutRoleInput } from './university-user-update-many-with-where-without-role.input';
import { UniversityUserScalarWhereInput } from './university-user-scalar-where.input';

@InputType()
export class UniversityUserUncheckedUpdateManyWithoutRoleInput {
    @Field(() => [UniversityUserCreateWithoutRoleInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutRoleInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutRoleInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutRoleInput>;

    @Field(() => [UniversityUserUpsertWithWhereUniqueWithoutRoleInput], {nullable:true})
    upsert?: Array<UniversityUserUpsertWithWhereUniqueWithoutRoleInput>;

    @Field(() => UniversityUserCreateManyRoleInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyRoleInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    set?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    disconnect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    delete?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserUpdateWithWhereUniqueWithoutRoleInput], {nullable:true})
    update?: Array<UniversityUserUpdateWithWhereUniqueWithoutRoleInput>;

    @Field(() => [UniversityUserUpdateManyWithWhereWithoutRoleInput], {nullable:true})
    updateMany?: Array<UniversityUserUpdateManyWithWhereWithoutRoleInput>;

    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    deleteMany?: Array<UniversityUserScalarWhereInput>;
}
