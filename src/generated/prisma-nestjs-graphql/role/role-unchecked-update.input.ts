import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UniversityUserUncheckedUpdateManyWithoutRoleInput } from '../university-user/university-user-unchecked-update-many-without-role.input';

@InputType()
export class RoleUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => UniversityUserUncheckedUpdateManyWithoutRoleInput, {nullable:true})
    universityUsers?: UniversityUserUncheckedUpdateManyWithoutRoleInput;
}
