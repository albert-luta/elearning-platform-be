import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true
		})
	],
	controllers: [],
	providers: []
})
export class AppModule {}
