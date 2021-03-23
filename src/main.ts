import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as redis from 'redis';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const RedisStore = connectRedis(session);
	const redisClient = redis.createClient();
	app.use(
		session({
			name: 'qid',
			store: new RedisStore({ client: redisClient, disableTouch: true }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'
			},
			secret: process.env.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: false
		})
	);

	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(8080);
}
bootstrap();
