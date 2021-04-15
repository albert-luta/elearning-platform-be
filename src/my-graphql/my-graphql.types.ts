import { Request, Response } from 'express';
import { TokensPayload } from '../auth/auth.types';

/**
 * Be sure to use this just inside private routes
 */
export type UserType = TokensPayload['user'];

export type ReqType = Request & { user?: UserType };
export type ResType = Response;

export interface MyContext {
	req: ReqType;
	res: ResType;
}
