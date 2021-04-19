import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UniversityUserWhereInput } from './university-user-where.input';
import { UniversityUserOrderByInput } from './university-user-order-by.input';
import { UniversityUserWhereUniqueInput } from './university-user-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UniversityUserScalarFieldEnum } from './university-user-scalar-field.enum';

@ArgsType()
export class FindManyUniversityUserArgs {
    @Field(() => UniversityUserWhereInput, {nullable:true})
    where?: UniversityUserWhereInput;

    @Field(() => [UniversityUserOrderByInput], {nullable:true})
    orderBy?: Array<UniversityUserOrderByInput>;

    @Field(() => UniversityUserWhereUniqueInput, {nullable:true})
    cursor?: UniversityUserWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UniversityUserScalarFieldEnum], {nullable:true})
    distinct?: Array<UniversityUserScalarFieldEnum>;
}
