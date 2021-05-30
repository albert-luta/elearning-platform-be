import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/my-graphql/my-graphql.types';
import { UNIVERSITY_ID_HEADER_NAME } from 'src/university/university.constants';
import { SCOPES_KEY } from '../decorators/scopes.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(ctx: ExecutionContext) {
		const scopes = this.reflector.getAllAndOverride<string[] | undefined>(
			SCOPES_KEY,
			[ctx.getHandler(), ctx.getClass()]
		);
		if (!scopes) {
			return true;
		}

		const graphQLCtx = GqlExecutionContext.create(
			ctx
		).getContext<MyContext>();

		const user = graphQLCtx.req.user;
		if (!user) {
			return false;
		}

		const universityId = graphQLCtx.req.headers[UNIVERSITY_ID_HEADER_NAME];
		if (universityId == null || Array.isArray(universityId)) {
			return false;
		}

		const userUniversity = user.universities[universityId];
		if (!userUniversity) {
			return false;
		}

		return scopes.every((scope) => !!userUniversity.scopes[scope]);
	}
}
