import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useLogger(app.get(MyLoggerService));
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(8080);
}
bootstrap();
