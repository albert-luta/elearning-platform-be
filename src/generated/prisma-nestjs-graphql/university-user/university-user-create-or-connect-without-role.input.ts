import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserCreateWithoutRoleInput } from './university-user-create-without-role.input';

@InputType()
export class UniversityUserCreateOrConnectWithoutRoleInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserCreateWithoutRoleInput, {nullable:false})
    create!: UniversityUserCreateWithoutRoleInput;
}
