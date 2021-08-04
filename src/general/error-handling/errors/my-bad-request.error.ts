export class MyBadRequestError extends Error {
	constructor(public readonly data: Record<string, string>) {
		super('MyBadRequestError');
	}
}
