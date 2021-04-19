import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUpdateInput } from './university-update.input';
import { UniversityWhereUniqueInput } from './university-where-unique.input';

@ArgsType()
export class UpdateOneUniversityArgs {
    @Field(() => UniversityUpdateInput, {nullable:false})
    data!: UniversityUpdateInput;

    @Field(() => UniversityWhereUniqueInput, {nullable:false})
    where!: UniversityWhereUniqueInput;
}
