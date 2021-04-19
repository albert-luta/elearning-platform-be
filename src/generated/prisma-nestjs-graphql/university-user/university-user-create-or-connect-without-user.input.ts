import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserCreateWithoutUserInput } from './university-user-create-without-user.input';

@InputType()
export class UniversityUserCreateOrConnectWithoutUserInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserCreateWithoutUserInput, {nullable:false})
    create!: UniversityUserCreateWithoutUserInput;
}
