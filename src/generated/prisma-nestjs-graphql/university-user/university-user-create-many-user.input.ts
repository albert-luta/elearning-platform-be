import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UniversityUserCreateManyUserInput {
    @Field(() => String, {nullable:false})
    universityId!: string;

    @Field(() => String, {nullable:false})
    roleId!: string;
}
