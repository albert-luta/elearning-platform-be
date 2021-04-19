import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ScopeUpdateManyWithoutRolesInput } from '../scope/scope-update-many-without-roles.input';

@InputType()
export class RoleUpdateWithoutUniversityUsersInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => ScopeUpdateManyWithoutRolesInput, {nullable:true})
    scopes?: ScopeUpdateManyWithoutRolesInput;
}
