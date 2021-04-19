import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserUpdateWithoutRoleInput } from './university-user-update-without-role.input';
import { UniversityUserCreateWithoutRoleInput } from './university-user-create-without-role.input';

@InputType()
export class UniversityUserUpsertWithWhereUniqueWithoutRoleInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserUpdateWithoutRoleInput, {nullable:false})
    update!: UniversityUserUpdateWithoutRoleInput;

    @Field(() => UniversityUserCreateWithoutRoleInput, {nullable:false})
    create!: UniversityUserCreateWithoutRoleInput;
}
