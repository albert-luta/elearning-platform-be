import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutUniversityInput } from './university-user-update-without-university.input';

@InputType()
export class UniversityUserUpdateWithWhereUniqueWithoutUniversityInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutUniversityInput, {nullable:false})
    data!: UniversityUserUpdateWithoutUniversityInput;
}
