import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UniversityUserCreateManyRoleInput } from './university-user-create-many-role.input';

@InputType()
export class UniversityUserCreateManyRoleInputEnvelope {
    @Field(() => [UniversityUserCreateManyRoleInput], {nullable:false})
    data!: Array<UniversityUserCreateManyRoleInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
