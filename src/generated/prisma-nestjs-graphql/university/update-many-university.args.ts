import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUpdateManyMutationInput } from './university-update-many-mutation.input';
import { UniversityWhereInput } from './university-where.input';

@ArgsType()
export class UpdateManyUniversityArgs {
    @Field(() => UniversityUpdateManyMutationInput, {nullable:false})
    data!: UniversityUpdateManyMutationInput;

    @Field(() => UniversityWhereInput, {nullable:true})
    where?: UniversityWhereInput;
}
