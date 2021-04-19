import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateManyUserInput } from './university-user-create-many-user.input';

@InputType()
export class UniversityUserCreateManyUserInputEnvelope {
    @Field(() => [UniversityUserCreateManyUserInput], {nullable:false})
    data!: Array<UniversityUserCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
