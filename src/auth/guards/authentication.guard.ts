import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/my-graphql/my-graphql.types';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { TokensService } from '../services/tokens.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly tokensService: TokensService,
		private readonly configService: ConfigService
	) {}

	canActivate(ctx: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[ctx.getHandler(), ctx.getClass()]
		);
		if (isPublic) {
			return true;
		}

		const graphQLCtx = GqlExecutionContext.create(
			ctx
		).getContext<MyContext>();
		const headers = graphQLCtx.req.headers;
		const authorization = headers.authorization;
		if (authorization == null) {
			throw new UnauthorizedException('jwt must be provided');
		}

		// Request comes from playground
		if (
			this.configService.get<string>('NODE_ENV') === 'development' &&
			headers.referer ===
				`http://localhost:${this.configService.get<string>(
					'PORT'
				)}/graphql`
		) {
			graphQLCtx.req.user = {
				id: authorization
			};
			return true;
		}

		if (!authorization.startsWith('Bearer ')) {
			throw new UnauthorizedException('invalid authorization header');
		}

		const accessToken = authorization.split(' ')[1];
		const tokenPayload = this.tokensService.getPayloadFromToken(
			accessToken,
			'access'
		);
		graphQLCtx.req.user = tokenPayload.user;
		return true;
	}
}
