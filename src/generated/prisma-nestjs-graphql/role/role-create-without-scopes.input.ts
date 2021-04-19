import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateNestedManyWithoutRoleInput } from '../university-user/university-user-create-nested-many-without-role.input';

@InputType()
export class RoleCreateWithoutScopesInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => UniversityUserCreateNestedManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserCreateNestedManyWithoutRoleInput;
}
