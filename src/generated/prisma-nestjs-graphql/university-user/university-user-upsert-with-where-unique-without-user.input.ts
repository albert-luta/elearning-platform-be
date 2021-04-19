import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutUserInput } from './university-user-update-without-user.input';
import { UniversityUserCreateWithoutUserInput } from './university-user-create-without-user.input';

@InputType()
export class UniversityUserUpsertWithWhereUniqueWithoutUserInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutUserInput, {nullable:false})
    update!: UniversityUserUpdateWithoutUserInput;

    @Field(() => UniversityUserCreateWithoutUserInput, {nullable:false})
    create!: UniversityUserCreateWithoutUserInput;
}
