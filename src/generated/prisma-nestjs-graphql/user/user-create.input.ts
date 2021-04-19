import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateNestedManyWithoutUserInput } from '../university-user/university-user-create-nested-many-without-user.input';

@InputType()
export class UserCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    firstName!: string;

    @Field(() => String, {nullable:false})
    lastName!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:true})
    avatar?: string;

    @Field(() => String, {nullable:false})
    fatherInitial!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => UniversityUserCreateNestedManyWithoutUserInput, {nullable:true})
    universityUsers?: UniversityUserCreateNestedManyWithoutUserInput;
}
