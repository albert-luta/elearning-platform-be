import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { University } from '../university/university.model';
import { User } from '../user/user.model';
import { Role } from '../role/role.model';

@ObjectType()
export class UniversityUser {
    @Field(() => String, {nullable:false})
    universityId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    roleId!: string;

    @Field(() => University, {nullable:false})
    university!: University;

    @Field(() => User, {nullable:false})
    user!: User;

    @Field(() => Role, {nullable:false})
    role!: Role;
}
