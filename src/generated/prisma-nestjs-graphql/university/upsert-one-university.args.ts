import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityWhereUniqueInput } from './university-where-unique.input';
import { UniversityCreateInput } from './university-create.input';
import { UniversityUpdateInput } from './university-update.input';

@ArgsType()
export class UpsertOneUniversityArgs {
    @Field(() => UniversityWhereUniqueInput, {nullable:false})
    where!: UniversityWhereUniqueInput;

    @Field(() => UniversityCreateInput, {nullable:false})
    create!: UniversityCreateInput;

    @Field(() => UniversityUpdateInput, {nullable:false})
    update!: UniversityUpdateInput;
}
