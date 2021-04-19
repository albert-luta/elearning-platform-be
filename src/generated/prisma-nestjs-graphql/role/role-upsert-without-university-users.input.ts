import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleUpdateWithoutUniversityUsersInput } from './role-update-without-university-users.input';
import { RoleCreateWithoutUniversityUsersInput } from './role-create-without-university-users.input';

@InputType()
export class RoleUpsertWithoutUniversityUsersInput {
    @Field(() => RoleUpdateWithoutUniversityUsersInput, {nullable:false})
    update!: RoleUpdateWithoutUniversityUsersInput;

    @Field(() => RoleCreateWithoutUniversityUsersInput, {nullable:false})
    create!: RoleCreateWithoutUniversityUsersInput;
}
