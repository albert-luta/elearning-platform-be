import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityCreateWithoutUniversityUsersInput } from './university-create-without-university-users.input';
import { UniversityCreateOrConnectWithoutUniversityUsersInput } from './university-create-or-connect-without-university-users.input';
import { UniversityWhereUniqueInput } from './university-where-unique.input';

@InputType()
export class UniversityCreateNestedOneWithoutUniversityUsersInput {
    @Field(() => UniversityCreateWithoutUniversityUsersInput, {nullable:true})
    create?: UniversityCreateWithoutUniversityUsersInput;

    @Field(() => UniversityCreateOrConnectWithoutUniversityUsersInput, {nullable:true})
    connectOrCreate?: UniversityCreateOrConnectWithoutUniversityUsersInput;

    @Field(() => UniversityWhereUniqueInput, {nullable:true})
    connect?: UniversityWhereUniqueInput;
}
