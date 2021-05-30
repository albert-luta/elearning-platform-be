import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/my-graphql/my-graphql.types';

export const User = createParamDecorator((_: never, ctx: ExecutionContext) => {
	const user = GqlExecutionContext.create(ctx).getContext<MyContext>().req
		.user;
	if (!user) {
		throw new UnauthorizedException();
	}

	return user;
});
