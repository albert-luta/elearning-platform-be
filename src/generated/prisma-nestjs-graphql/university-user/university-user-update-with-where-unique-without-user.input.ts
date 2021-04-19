import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutUserInput } from './university-user-update-without-user.input';

@InputType()
export class UniversityUserUpdateWithWhereUniqueWithoutUserInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutUserInput, {nullable:false})
    data!: UniversityUserUpdateWithoutUserInput;
}
