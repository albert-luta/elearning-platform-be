import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UniversityUserOrderByInput {
    @Field(() => SortOrder, {nullable:true})
    universityId?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: SortOrder;

    @Field(() => SortOrder, {nullable:true})
    roleId?: SortOrder;
}
