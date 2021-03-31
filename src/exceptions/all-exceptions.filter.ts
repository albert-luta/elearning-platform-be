import { Catch, ArgumentsHost } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { GqlContextType } from '@nestjs/graphql';
import { TokensService } from 'src/auth/tokens.service';

@Catch()
export class AllExceptionsFilter extends ExternalExceptionFilter {
	constructor(private readonly tokensService: TokensService) {
		super();
	}

	catch(exception: any, host: ArgumentsHost) {
		if (
			host.getType<GqlContextType>() === 'graphql' &&
			exception.status === 401
		) {
			const ctx = host.getArgByIndex(2);

			this.tokensService.clearRefreshTokenCookie(ctx.res);
		}

		super.catch(exception, host);
	}
}
