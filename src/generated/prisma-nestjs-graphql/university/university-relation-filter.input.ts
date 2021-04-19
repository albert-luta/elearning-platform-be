import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityWhereInput } from './university-where.input';

@InputType()
export class UniversityRelationFilter {
    @Field(() => UniversityWhereInput, {nullable:true})
    is?: UniversityWhereInput;

    @Field(() => UniversityWhereInput, {nullable:true})
    isNot?: UniversityWhereInput;
}
