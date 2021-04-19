import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityWhereInput } from './university-where.input';

@ArgsType()
export class DeleteManyUniversityArgs {
    @Field(() => UniversityWhereInput, {nullable:true})
    where?: UniversityWhereInput;
}
