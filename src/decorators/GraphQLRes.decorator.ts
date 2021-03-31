import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

export type GraphQLResType = Response;

export const GraphQLRes = createParamDecorator(
	(key: undefined, ctx: ExecutionContext) => {
		return GqlExecutionContext.create(ctx).getContext().res;
	}
);
