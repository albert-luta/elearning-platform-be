import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutUniversityUsersInput } from '../user/user-create-nested-one-without-university-users.input';
import { RoleCreateNestedOneWithoutUniversityUsersInput } from '../role/role-create-nested-one-without-university-users.input';

@InputType()
export class UniversityUserCreateWithoutUniversityInput {
    @Field(() => UserCreateNestedOneWithoutUniversityUsersInput, {nullable:false})
    user!: UserCreateNestedOneWithoutUniversityUsersInput;

    @Field(() => RoleCreateNestedOneWithoutUniversityUsersInput, {nullable:false})
    role!: RoleCreateNestedOneWithoutUniversityUsersInput;
}
