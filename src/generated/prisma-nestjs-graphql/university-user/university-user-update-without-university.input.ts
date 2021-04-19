import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutUniversityUsersInput } from '../user/user-update-one-required-without-university-users.input';
import { RoleUpdateOneRequiredWithoutUniversityUsersInput } from '../role/role-update-one-required-without-university-users.input';

@InputType()
export class UniversityUserUpdateWithoutUniversityInput {
    @Field(() => UserUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUniversityUsersInput;

    @Field(() => RoleUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    role?: RoleUpdateOneRequiredWithoutUniversityUsersInput;
}
