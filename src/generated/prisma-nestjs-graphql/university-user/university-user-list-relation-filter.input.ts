import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserWhereInput } from './university-user-where.input';

@InputType()
export class UniversityUserListRelationFilter {
    @Field(() => UniversityUserWhereInput, {nullable:true})
    every?: UniversityUserWhereInput;

    @Field(() => UniversityUserWhereInput, {nullable:true})
    some?: UniversityUserWhereInput;

    @Field(() => UniversityUserWhereInput, {nullable:true})
    none?: UniversityUserWhereInput;
}
