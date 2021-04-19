import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RoleUpdateManyWithoutScopesInput } from '../role/role-update-many-without-scopes.input';

@InputType()
export class ScopeUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => RoleUpdateManyWithoutScopesInput, {nullable:true})
    roles?: RoleUpdateManyWithoutScopesInput;
}
