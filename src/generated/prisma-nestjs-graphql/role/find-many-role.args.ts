import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RoleWhereInput } from './role-where.input';
import { RoleOrderByInput } from './role-order-by.input';
import { RoleWhereUniqueInput } from './role-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RoleScalarFieldEnum } from './role-scalar-field.enum';

@ArgsType()
export class FindManyRoleArgs {
    @Field(() => RoleWhereInput, {nullable:true})
    where?: RoleWhereInput;

    @Field(() => [RoleOrderByInput], {nullable:true})
    orderBy?: Array<RoleOrderByInput>;

    @Field(() => RoleWhereUniqueInput, {nullable:true})
    cursor?: RoleWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [RoleScalarFieldEnum], {nullable:true})
    distinct?: Array<RoleScalarFieldEnum>;
}
