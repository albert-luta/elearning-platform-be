import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutUserInput } from './university-user-create-without-user.input';
import { UniversityUserCreateOrConnectWithoutUserInput } from './university-user-create-or-connect-without-user.input';
import { UniversityUserCreateManyUserInputEnvelope } from './university-user-create-many-user-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';

@InputType()
export class UniversityUserCreateNestedManyWithoutUserInput {
    @Field(() => [UniversityUserCreateWithoutUserInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutUserInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutUserInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutUserInput>;

    @Field(() => UniversityUserCreateManyUserInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyUserInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;
}
