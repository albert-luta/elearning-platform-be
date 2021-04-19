import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUpdateOneRequiredWithoutUniversityUsersInput } from '../university/university-update-one-required-without-university-users.input';
import { UserUpdateOneRequiredWithoutUniversityUsersInput } from '../user/user-update-one-required-without-university-users.input';
import { RoleUpdateOneRequiredWithoutUniversityUsersInput } from '../role/role-update-one-required-without-university-users.input';

@InputType()
export class UniversityUserUpdateInput {
    @Field(() => UniversityUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    university?: UniversityUpdateOneRequiredWithoutUniversityUsersInput;

    @Field(() => UserUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUniversityUsersInput;

    @Field(() => RoleUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    role?: RoleUpdateOneRequiredWithoutUniversityUsersInput;
}
