import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateManyUniversityInput } from './university-user-create-many-university.input';

@InputType()
export class UniversityUserCreateManyUniversityInputEnvelope {
    @Field(() => [UniversityUserCreateManyUniversityInput], {nullable:false})
    data!: Array<UniversityUserCreateManyUniversityInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
