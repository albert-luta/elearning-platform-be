import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutUserInput } from './university-user-create-without-user.input';
import { UniversityUserCreateOrConnectWithoutUserInput } from './university-user-create-or-connect-without-user.input';
import { UniversityUserUpsertWithWhereUniqueWithoutUserInput } from './university-user-upsert-with-where-unique-without-user.input';
import { UniversityUserCreateManyUserInputEnvelope } from './university-user-create-many-user-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithWhereUniqueWithoutUserInput } from './university-user-update-with-where-unique-without-user.input';
import { UniversityUserUpdateManyWithWhereWithoutUserInput } from './university-user-update-many-with-where-without-user.input';
import { UniversityUserScalarWhereInput } from './university-user-scalar-where.input';

@InputType()
export class UniversityUserUpdateManyWithoutUserInput {
    @Field(() => [UniversityUserCreateWithoutUserInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutUserInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutUserInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutUserInput>;

    @Field(() => [UniversityUserUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    upsert?: Array<UniversityUserUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => UniversityUserCreateManyUserInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyUserInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    set?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    disconnect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    delete?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    update?: Array<UniversityUserUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [UniversityUserUpdateManyWithWhereWithoutUserInput], {nullable:true})
    updateMany?: Array<UniversityUserUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    deleteMany?: Array<UniversityUserScalarWhereInput>;
}
