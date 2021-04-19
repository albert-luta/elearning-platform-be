import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { ScopeUpdateWithoutRolesInput } from './scope-update-without-roles.input';

@InputType()
export class ScopeUpdateWithWhereUniqueWithoutRolesInput {
    @Field(() => ScopeWhereUniqueInput, {nullable:false})
    where!: ScopeWhereUniqueInput;

    @Field(() => ScopeUpdateWithoutRolesInput, {nullable:false})
    data!: ScopeUpdateWithoutRolesInput;
}
