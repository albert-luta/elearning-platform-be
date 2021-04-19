import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ScopeUpdateManyWithoutRolesInput } from '../scope/scope-update-many-without-roles.input';
import { UniversityUserUpdateManyWithoutRoleInput } from '../university-user/university-user-update-many-without-role.input';

@InputType()
export class RoleUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => ScopeUpdateManyWithoutRolesInput, {nullable:true})
    scopes?: ScopeUpdateManyWithoutRolesInput;

    @Field(() => UniversityUserUpdateManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserUpdateManyWithoutRoleInput;
}
