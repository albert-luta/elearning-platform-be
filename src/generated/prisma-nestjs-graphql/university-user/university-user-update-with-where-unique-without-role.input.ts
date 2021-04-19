import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutRoleInput } from './university-user-update-without-role.input';

@InputType()
export class UniversityUserUpdateWithWhereUniqueWithoutRoleInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutRoleInput, {nullable:false})
    data!: UniversityUserUpdateWithoutRoleInput;
}
