import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { RoleCreateWithoutUniversityUsersInput } from './role-create-without-university-users.input';

@InputType()
export class RoleCreateOrConnectWithoutUniversityUsersInput {
    @Field(() => RoleWhereUniqueInput, {nullable:false})
    where!: RoleWhereUniqueInput;

    @Field(() => RoleCreateWithoutUniversityUsersInput, {nullable:false})
    create!: RoleCreateWithoutUniversityUsersInput;
}
