import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserCreateManyInput } from './university-user-create-many.input';

@ArgsType()
export class CreateManyUniversityUserArgs {
    @Field(() => [UniversityUserCreateManyInput], {nullable:false})
    data!: Array<UniversityUserCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
