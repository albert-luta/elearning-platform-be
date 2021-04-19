import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserUncheckedCreateNestedManyWithoutRoleInput } from '../university-user/university-user-unchecked-create-nested-many-without-role.input';

@InputType()
export class RoleUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UniversityUserUncheckedCreateNestedManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserUncheckedCreateNestedManyWithoutRoleInput;
}
