import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ScopeWhereUniqueInput } from './scope-where-unique.input';
import { ScopeCreateWithoutRolesInput } from './scope-create-without-roles.input';

@InputType()
export class ScopeCreateOrConnectWithoutRolesInput {
    @Field(() => ScopeWhereUniqueInput, {nullable:false})
    where!: ScopeWhereUniqueInput;

    @Field(() => ScopeCreateWithoutRolesInput, {nullable:false})
    create!: ScopeCreateWithoutRolesInput;
}
