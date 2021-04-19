import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUpdateWithoutUniversityUsersInput } from './university-update-without-university-users.input';
import { UniversityCreateWithoutUniversityUsersInput } from './university-create-without-university-users.input';

@InputType()
export class UniversityUpsertWithoutUniversityUsersInput {
    @Field(() => UniversityUpdateWithoutUniversityUsersInput, {nullable:false})
    update!: UniversityUpdateWithoutUniversityUsersInput;

    @Field(() => UniversityCreateWithoutUniversityUsersInput, {nullable:false})
    create!: UniversityCreateWithoutUniversityUsersInput;
}
