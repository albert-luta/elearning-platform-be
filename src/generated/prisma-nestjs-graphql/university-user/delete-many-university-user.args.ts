import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserWhereInput } from './university-user-where.input';

@ArgsType()
export class DeleteManyUniversityUserArgs {
    @Field(() => UniversityUserWhereInput, {nullable:true})
    where?: UniversityUserWhereInput;
}
