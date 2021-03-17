import { Logger } from '@nestjs/common';

export class MyLoggerService extends Logger {
	error(message: string, trace: string) {
		// TODO: log errors to db
		super.error(message, trace);
	}
}
