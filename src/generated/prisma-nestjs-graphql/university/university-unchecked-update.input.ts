import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { UniversityUserUncheckedUpdateManyWithoutUniversityInput } from '../university-user/university-user-unchecked-update-many-without-university.input';

@InputType()
export class UniversityUncheckedUpdateInput {
    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    logo?: NullableStringFieldUpdateOperationsInput;

    @Field(() => UniversityUserUncheckedUpdateManyWithoutUniversityInput, {nullable:true})
    universityUsers?: UniversityUserUncheckedUpdateManyWithoutUniversityInput;
}
