import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UniversityUserUpdateManyWithoutRoleInput } from '../university-user/university-user-update-many-without-role.input';

@InputType()
export class RoleUpdateWithoutScopesInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => UniversityUserUpdateManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserUpdateManyWithoutRoleInput;
}
