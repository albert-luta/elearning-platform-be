import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityCreateManyInput } from './university-create-many.input';

@ArgsType()
export class CreateManyUniversityArgs {
    @Field(() => [UniversityCreateManyInput], {nullable:false})
    data!: Array<UniversityCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
