import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GraphQLReqType } from 'src/decorators/GraphQLReq.decorator';
import { GraphQLResType } from 'src/decorators/GraphQLRes.decorator';
import {
	ACCESS_TOKEN_EXPIRES_IN,
	INFINITE_COOKIE_MAX_AGE,
	REFRESH_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_EXPIRES_IN
} from './constants';

@Injectable()
export class TokensService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	generateTokens(payload: any) {
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
			secret: this.configService.get('ACCESS_TOKEN_SECRET')
		});
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: REFRESH_TOKEN_EXPIRES_IN,
			secret: this.configService.get('REFRESH_TOKEN_SECRET')
		});

		return { accessToken, refreshToken };
	}

	setRefreshTokenCookie(refreshToken: string, res: GraphQLResType) {
		res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
			...this.refreshTokenCookieOptions,
			maxAge: INFINITE_COOKIE_MAX_AGE
		});
	}

	clearRefreshTokenCookie(res: GraphQLResType) {
		res.clearCookie(
			REFRESH_TOKEN_COOKIE_NAME,
			this.refreshTokenCookieOptions
		);
	}

	getPayloadFromRefreshToken(req: GraphQLReqType) {
		const token = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

		try {
			const payload = this.jwtService.verify(token, {
				secret: this.configService.get('REFRESH_TOKEN_SECRET')
			});

			return this.normalizePayload(payload);
		} catch ({ message }) {
			if (
				message === 'jwt must be provided' ||
				message === 'jwt expired'
			) {
				throw new UnauthorizedException(message);
			}

			throw new UnauthorizedException();
		}
	}

	private normalizePayload(payload: Record<string, unknown>) {
		const { exp, iat, ...normalizedPayload } = payload;

		return normalizedPayload;
	}

	private get refreshTokenCookieOptions() {
		return {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') === 'production'
		};
	}
}
