import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { ScopeUpdateWithoutRolesInput } from './scope-update-without-roles.input';
import { ScopeCreateWithoutRolesInput } from './scope-create-without-roles.input';

@InputType()
export class ScopeUpsertWithWhereUniqueWithoutRolesInput {
    @Field(() => ScopeWhereUniqueInput, {nullable:false})
    where!: ScopeWhereUniqueInput;

    @Field(() => ScopeUpdateWithoutRolesInput, {nullable:false})
    update!: ScopeUpdateWithoutRolesInput;

    @Field(() => ScopeCreateWithoutRolesInput, {nullable:false})
    create!: ScopeCreateWithoutRolesInput;
}
