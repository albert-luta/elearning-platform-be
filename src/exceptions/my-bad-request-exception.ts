import { BadRequestException, HttpStatus } from '@nestjs/common';

export type MyBadRequestExceptionResponse = Record<string, string>;

export class MyBadRequestException extends BadRequestException {
	constructor(message: MyBadRequestExceptionResponse) {
		super({
			statusCode: HttpStatus.BAD_REQUEST,
			message
		});
	}
}
