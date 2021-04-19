import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUpdateOneRequiredWithoutUniversityUsersInput } from '../university/university-update-one-required-without-university-users.input';
import { UserUpdateOneRequiredWithoutUniversityUsersInput } from '../user/user-update-one-required-without-university-users.input';

@InputType()
export class UniversityUserUpdateWithoutRoleInput {
    @Field(() => UniversityUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    university?: UniversityUpdateOneRequiredWithoutUniversityUsersInput;

    @Field(() => UserUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutUniversityUsersInput;
}
