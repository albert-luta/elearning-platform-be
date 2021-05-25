import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';
import { ResType } from 'src/my-graphql/my-graphql.types';
import {
	ACCESS_TOKEN_EXPIRES_IN,
	INFINITE_COOKIE_MAX_AGE,
	REFRESH_TOKEN_COOKIE_NAME,
	REFRESH_TOKEN_EXPIRES_IN
} from '../auth.constants';
import { TokensPayload } from '../auth.types';

@Injectable()
export class TokensService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	generateTokens(
		payload: TokensPayload
	): {
		accessToken: string;
		refreshToken: string;
	} {
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
			secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')
		});
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: REFRESH_TOKEN_EXPIRES_IN,
			secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')
		});

		return { accessToken, refreshToken };
	}

	setRefreshTokenCookie(refreshToken: string, res: ResType): void {
		res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
			...this.refreshTokenCookieOptions,
			maxAge: INFINITE_COOKIE_MAX_AGE
		});
	}

	clearRefreshTokenCookie(res: ResType): void {
		res.clearCookie(
			REFRESH_TOKEN_COOKIE_NAME,
			this.refreshTokenCookieOptions
		);
	}

	getPayloadFromToken(
		token: string,
		tokenType: 'refresh' | 'access'
	): TokensPayload {
		const tokenEnvKey =
			tokenType === 'refresh'
				? 'REFRESH_TOKEN_SECRET'
				: 'ACCESS_TOKEN_SECRET';
		try {
			const payload = this.jwtService.verify(token, {
				secret: this.configService.get<string>(tokenEnvKey)
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

	private normalizePayload(payload: any): TokensPayload {
		const { exp, iat, ...normalizedPayload } = payload;

		return normalizedPayload;
	}

	private get refreshTokenCookieOptions(): CookieOptions {
		return {
			httpOnly: true,
			secure: this.configService.get<string>('NODE_ENV') === 'production',
			sameSite: 'none'
		};
	}
}
