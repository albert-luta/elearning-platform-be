import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateNestedManyWithoutUniversityInput } from '../university-user/university-user-create-nested-many-without-university.input';

@InputType()
export class UniversityCreateInput {
    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    logo?: string;

    @Field(() => UniversityUserCreateNestedManyWithoutUniversityInput, {nullable:true})
    universityUsers?: UniversityUserCreateNestedManyWithoutUniversityInput;
}
