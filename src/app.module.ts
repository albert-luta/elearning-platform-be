import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { formatGraphQLError } from './exceptions/formatGraphQLError';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

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
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter
		}
	]
})
export class AppModule {}
