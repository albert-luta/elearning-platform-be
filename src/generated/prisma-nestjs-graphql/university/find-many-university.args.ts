import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityWhereInput } from './university-where.input';
import { UniversityOrderByInput } from './university-order-by.input';
import { UniversityWhereUniqueInput } from './university-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UniversityScalarFieldEnum } from './university-scalar-field.enum';

@ArgsType()
export class FindManyUniversityArgs {
    @Field(() => UniversityWhereInput, {nullable:true})
    where?: UniversityWhereInput;

    @Field(() => [UniversityOrderByInput], {nullable:true})
    orderBy?: Array<UniversityOrderByInput>;

    @Field(() => UniversityWhereUniqueInput, {nullable:true})
    cursor?: UniversityWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UniversityScalarFieldEnum], {nullable:true})
    distinct?: Array<UniversityScalarFieldEnum>;
}
