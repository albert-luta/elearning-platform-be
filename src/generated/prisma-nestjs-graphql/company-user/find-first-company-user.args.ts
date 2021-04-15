import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CompanyUserWhereInput } from './company-user-where.input';
import { CompanyUserOrderByInput } from './company-user-order-by.input';
import { CompanyUserWhereUniqueInput } from './company-user-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CompanyUserScalarFieldEnum } from './company-user-scalar-field.enum';

@ArgsType()
export class FindFirstCompanyUserArgs {
    @Field(() => CompanyUserWhereInput, {nullable:true})
    where?: CompanyUserWhereInput;

    @Field(() => [CompanyUserOrderByInput], {nullable:true})
    orderBy?: Array<CompanyUserOrderByInput>;

    @Field(() => CompanyUserWhereUniqueInput, {nullable:true})
    cursor?: CompanyUserWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CompanyUserScalarFieldEnum], {nullable:true})
    distinct?: Array<CompanyUserScalarFieldEnum>;
}
