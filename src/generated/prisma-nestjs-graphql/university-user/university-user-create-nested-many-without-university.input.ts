import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutUniversityInput } from './university-user-create-without-university.input';
import { UniversityUserCreateOrConnectWithoutUniversityInput } from './university-user-create-or-connect-without-university.input';
import { UniversityUserCreateManyUniversityInputEnvelope } from './university-user-create-many-university-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';

@InputType()
export class UniversityUserCreateNestedManyWithoutUniversityInput {
    @Field(() => [UniversityUserCreateWithoutUniversityInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutUniversityInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutUniversityInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutUniversityInput>;

    @Field(() => UniversityUserCreateManyUniversityInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyUniversityInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;
}
