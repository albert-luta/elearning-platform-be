import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateWithoutRoleInput } from './university-user-create-without-role.input';
import { UniversityUserCreateOrConnectWithoutRoleInput } from './university-user-create-or-connect-without-role.input';
import { UniversityUserCreateManyRoleInputEnvelope } from './university-user-create-many-role-input-envelope.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';

@InputType()
export class UniversityUserCreateNestedManyWithoutRoleInput {
    @Field(() => [UniversityUserCreateWithoutRoleInput], {nullable:true})
    create?: Array<UniversityUserCreateWithoutRoleInput>;

    @Field(() => [UniversityUserCreateOrConnectWithoutRoleInput], {nullable:true})
    connectOrCreate?: Array<UniversityUserCreateOrConnectWithoutRoleInput>;

    @Field(() => UniversityUserCreateManyRoleInputEnvelope, {nullable:true})
    createMany?: UniversityUserCreateManyRoleInputEnvelope;

    @Field(() => [UniversityUserWhereUniqueInput], {nullable:true})
    connect?: Array<UniversityUserWhereUniqueInput>;
}
