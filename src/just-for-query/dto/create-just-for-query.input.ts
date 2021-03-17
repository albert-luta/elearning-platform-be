import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJustForQueryInput {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number;
}
