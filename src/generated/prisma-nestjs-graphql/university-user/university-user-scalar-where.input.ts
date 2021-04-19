import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class UniversityUserScalarWhereInput {
    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    AND?: Array<UniversityUserScalarWhereInput>;

    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    OR?: Array<UniversityUserScalarWhereInput>;

    @Field(() => [UniversityUserScalarWhereInput], {nullable:true})
    NOT?: Array<UniversityUserScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    universityId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    roleId?: StringFilter;
}
