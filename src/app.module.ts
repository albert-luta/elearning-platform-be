import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { formatGraphQLError } from './errors/formatGraphQLError';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
			cors: true,
			formatError: formatGraphQLError,
			context: ({ req, res }) => ({ req, res })
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true
		}),
		PrismaModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
