import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface MySessionType {
	user: { id: string } | undefined;
}

export const MySession = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) =>
		GqlExecutionContext.create(ctx).getContext().req.session
);
