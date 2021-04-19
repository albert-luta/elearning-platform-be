import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityWhereUniqueInput } from './university-where-unique.input';

@ArgsType()
export class DeleteOneUniversityArgs {
    @Field(() => UniversityWhereUniqueInput, {nullable:false})
    where!: UniversityWhereUniqueInput;
}
