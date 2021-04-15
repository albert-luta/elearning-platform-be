import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/my-graphql/my-graphql.types';

export const GraphQLReq = createParamDecorator(
	(key: undefined, ctx: ExecutionContext) => {
		return GqlExecutionContext.create(ctx).getContext<MyContext>().req;
	}
);
