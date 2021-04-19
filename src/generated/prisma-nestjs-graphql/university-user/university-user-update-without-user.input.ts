import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUpdateOneRequiredWithoutUniversityUsersInput } from '../university/university-update-one-required-without-university-users.input';
import { RoleUpdateOneRequiredWithoutUniversityUsersInput } from '../role/role-update-one-required-without-university-users.input';

@InputType()
export class UniversityUserUpdateWithoutUserInput {
    @Field(() => UniversityUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    university?: UniversityUpdateOneRequiredWithoutUniversityUsersInput;

    @Field(() => RoleUpdateOneRequiredWithoutUniversityUsersInput, {nullable:true})
    role?: RoleUpdateOneRequiredWithoutUniversityUsersInput;
}
