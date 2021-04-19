import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserUncheckedCreateNestedManyWithoutUniversityInput } from '../university-user/university-user-unchecked-create-nested-many-without-university.input';

@InputType()
export class UniversityUncheckedCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: string;

    @Field(() => UniversityUserUncheckedCreateNestedManyWithoutUniversityInput, {nullable:true})
    universityUsers?: UniversityUserUncheckedCreateNestedManyWithoutUniversityInput;
}
