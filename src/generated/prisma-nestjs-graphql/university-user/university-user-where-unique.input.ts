import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserUniversityIdUserIdCompoundUniqueInput } from '../prisma/university-user-university-id-user-id-compound-unique.input';

@InputType()
export class UniversityUserWhereUniqueInput {
    @Field(() => UniversityUserUniversityIdUserIdCompoundUniqueInput, {nullable:true})
    universityId_userId?: UniversityUserUniversityIdUserIdCompoundUniqueInput;
}
