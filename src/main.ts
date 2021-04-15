import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { validationExceptionFactory } from './general/error-handling/format/validation-exception-factory';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.useGlobalPipes(
		new ValidationPipe({ exceptionFactory: validationExceptionFactory })
	);

	await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
