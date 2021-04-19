import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutUniversityInput } from './university-user-update-without-university.input';
import { UniversityUserCreateWithoutUniversityInput } from './university-user-create-without-university.input';

@InputType()
export class UniversityUserUpsertWithWhereUniqueWithoutUniversityInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutUniversityInput, {nullable:false})
    update!: UniversityUserUpdateWithoutUniversityInput;

    @Field(() => UniversityUserCreateWithoutUniversityInput, {nullable:false})
    create!: UniversityUserCreateWithoutUniversityInput;
}
