import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityCreateWithoutUniversityUsersInput } from './university-create-without-university-users.input';
import { UniversityCreateOrConnectWithoutUniversityUsersInput } from './university-create-or-connect-without-university-users.input';
import { UniversityUpsertWithoutUniversityUsersInput } from './university-upsert-without-university-users.input';
import { UniversityWhereUniqueInput } from './university-where-unique.input';
import { UniversityUpdateWithoutUniversityUsersInput } from './university-update-without-university-users.input';

@InputType()
export class UniversityUpdateOneRequiredWithoutUniversityUsersInput {
    @Field(() => UniversityCreateWithoutUniversityUsersInput, {nullable:true})
    create?: UniversityCreateWithoutUniversityUsersInput;

    @Field(() => UniversityCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: UniversityCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => UniversityUpsertWithoutUniversityUsersInput, {nullable:true})
    upsert?: UniversityUpsertWithoutUniversityUsersInput;

    @Field(() => UniversityWhereUniqueInput, {nullable:true})
    connect?: UniversityWhereUniqueInput;

    @Field(() => UniversityUpdateWithoutUniversityUsersInput, {nullable:true})
    update?: UniversityUpdateWithoutUniversityUsersInput;
}
