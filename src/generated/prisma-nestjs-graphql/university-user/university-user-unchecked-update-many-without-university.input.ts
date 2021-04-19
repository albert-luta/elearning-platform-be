import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutUniversityInput } from './university-user-create-without-university.input';
import { UniversityUserCreateOrConnectWithoutUniversityInput } from './university-user-create-or-connect-without-university.input';
import { UniversityUserUpsertWithWhereUniqueWithoutUniversityInput } from './university-user-upsert-with-where-unique-without-university.input';
import { UniversityUserCreateManyUniversityInputEnvelope } from './university-user-create-many-university-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithWhereUniqueWithoutUniversityInput } from './university-user-update-with-where-unique-without-university.input';
import { UniversityUserUpdateManyWithWhereWithoutUniversityInput } from './university-user-update-many-with-where-without-university.input';
import { UniversityUserScalarWhereInput } from './university-user-scalar-where.input';

@InputType()
export class UniversityUserUncheckedUpdateManyWithoutUniversityInput {
    @Field(() => [UniversityUserCreateWithoutUniversityInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutUniversityInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutUniversityInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutUniversityInput>;

    @Field(() => [UniversityUserUpsertWithWhereUniqueWithoutUniversityInput], {nullable:true})
    upsert?: Array<UniversityUserUpsertWithWhereUniqueWithoutUniversityInput>;

    @Field(() => UniversityUserCreateManyUniversityInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyUniversityInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    set?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    disconnect?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    delete?: Array<UniversityUserWhereUniqueInput>;

    @Field(() => [UniversityUserUpdateWithWhereUniqueWithoutUniversityInput], {nullable:true})
    update?: Array<UniversityUserUpdateWithWhereUniqueWithoutUniversityInput>;

    @Field(() => [UniversityUserUpdateManyWithWhereWithoutUniversityInput], {nullable:true})
    updateMany?: Array<UniversityUserUpdateManyWithWhereWithoutUniversityInput>;

    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    deleteMany?: Array<UniversityUserScalarWhereInput>;
}
