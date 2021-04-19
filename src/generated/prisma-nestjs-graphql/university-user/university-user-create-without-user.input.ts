import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityCreateNestedOneWithoutUniversityUsersInput } from '../university/university-create-nested-one-without-university-users.input';
import { RoleCreateNestedOneWithoutUniversityUsersInput } from '../role/role-create-nested-one-without-university-users.input';

@InputType()
export class UniversityUserCreateWithoutUserInput {
    @Field(() => UniversityCreateNestedOneWithoutUniversityUsersInput, {nullable:false})
    university!: UniversityCreateNestedOneWithoutUniversityUsersInput;

    @Field(() => RoleCreateNestedOneWithoutUniversityUsersInput, {nullable:false})
    role!: RoleCreateNestedOneWithoutUniversityUsersInput;
}
