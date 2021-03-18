import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { join } from 'path';
import { JustForQueryModule } from './just-for-query/just-for-query.module';
import { MessageModule } from './message/message.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true
		}),
		MyLoggerModule,
		JustForQueryModule,
		MessageModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
