import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityWhereUniqueInput } from './university-where-unique.input';
import { UniversityCreateWithoutUniversityUsersInput } from './university-create-without-university-users.input';

@InputType()
export class UniversityCreateOrConnectWithoutUniversityUsersInput {
    @Field(() => UniversityWhereUniqueInput, {nullable:false})
    where!: UniversityWhereUniqueInput;

    @Field(() => UniversityCreateWithoutUniversityUsersInput, {nullable:false})
    create!: UniversityCreateWithoutUniversityUsersInput;
}
