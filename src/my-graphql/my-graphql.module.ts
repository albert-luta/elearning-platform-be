import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { formatGraphQLError } from './format-graphql-error';
import { MyContext } from './my-graphql.types';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			cors: {
				credentials: true,
				origin: process.env.FRONTEND_URL
			},
			formatError: formatGraphQLError,
			context: ({ req, res }): MyContext => ({ req, res })
		})
	]
})
export class MyGraphQLModule {}
