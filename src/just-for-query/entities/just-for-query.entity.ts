import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class JustForQuery {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number;
}
