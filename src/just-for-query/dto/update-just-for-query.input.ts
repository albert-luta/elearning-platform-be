import { CreateJustForQueryInput } from './create-just-for-query.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJustForQueryInput extends PartialType(
	CreateJustForQueryInput
) {
	@Field(() => Int)
	id: number;
}
