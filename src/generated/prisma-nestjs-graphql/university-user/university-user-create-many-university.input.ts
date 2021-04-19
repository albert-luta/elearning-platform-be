import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UniversityUserCreateManyUniversityInput {
    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    roleId!: string;
}
