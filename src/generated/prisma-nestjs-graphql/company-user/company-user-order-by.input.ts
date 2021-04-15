import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CompanyUserOrderByInput {
    @Field(() => SortOrder, {nullable:true})
    id?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    companyId?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    role?: SortOrder;
}
