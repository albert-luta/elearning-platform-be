import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { UniversityUserCreateWithoutUniversityInput } from './university-user-create-without-university.input';

@InputType()
export class UniversityUserCreateOrConnectWithoutUniversityInput {
    @Field(() => UniversityUserWhereUniqueInput, {nullable:false})
    where!: UniversityUserWhereUniqueInput;

    @Field(() => UniversityUserCreateWithoutUniversityInput, {nullable:false})
    create!: UniversityUserCreateWithoutUniversityInput;
}
