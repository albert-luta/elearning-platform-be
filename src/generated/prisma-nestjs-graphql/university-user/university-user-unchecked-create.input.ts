import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UniversityUserUncheckedCreateInput {
    @Field(() => String, {nullable:false})
    universityId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    roleId!: string;
}
