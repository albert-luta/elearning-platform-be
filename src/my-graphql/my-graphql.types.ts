import { Request, Response } from 'express';
import { TokensPayload } from '../auth/auth.types';

export type UserType = TokensPayload['user'];

export type ReqType = Request & { user?: UserType };
export type ResType = Response;

export interface MyContext {
	req: ReqType;
	res: ResType;
}
