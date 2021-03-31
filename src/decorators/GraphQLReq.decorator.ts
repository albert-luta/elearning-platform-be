import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export type GraphQLReqType = Request;

export const GraphQLReq = createParamDecorator(
	(key: undefined, ctx: ExecutionContext) => {
		return GqlExecutionContext.create(ctx).getContext().req;
	}
);
