import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserInput } from './dto/register-user.input';
import * as argon2 from 'argon2';
import { PrismaError } from 'prisma-error-enum';
import { LoginUserInput } from './dto/login-user.input';
import { GraphQLResType } from 'src/decorators/GraphQLRes.decorator';
import { Authentication } from './dto/authentication.object';
import { TokensService } from './tokens.service';
import { GraphQLReqType } from 'src/decorators/GraphQLReq.decorator';
import { MyBadRequestException } from 'src/exceptions/my-bad-request-exception';

interface TokensPayload {
	user: {
		id: string;
	};
}

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly tokensService: TokensService
	) {}

	async register(
		{
			email,
			fatherInitial,
			firstName,
			lastName,
			password
		}: RegisterUserInput,
		res: GraphQLResType
	): Promise<Authentication> {
		try {
			const hashedPassword = await argon2.hash(password.trim());
			const createdUser = await this.prisma.user.create({
				data: {
					email,
					firstName: firstName.trim(),
					lastName: lastName.trim().toUpperCase(),
					fatherInitial: fatherInitial.trim().toUpperCase(),
					password: hashedPassword
				}
			});

			const tokensPayload: TokensPayload = {
				user: { id: createdUser.id }
			};
			const {
				accessToken,
				refreshToken
			} = this.tokensService.generateTokens(tokensPayload);

			this.tokensService.setRefreshTokenCookie(refreshToken, res);
			return { accessToken };
		} catch (e) {
			if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('email')
			) {
				throw new MyBadRequestException({
					email: 'Email is already in use'
				});
			}

			throw new InternalServerErrorException();
		}
	}

	async login(userProvided: LoginUserInput, res: GraphQLResType) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: userProvided.email
			}
		});
		if (user == null) {
			throw new MyBadRequestException({
				email: 'There is no user registered with this email'
			});
		}

		const hasCorrectPassword = await argon2.verify(
			user.password,
			userProvided.password
		);
		if (!hasCorrectPassword) {
			throw new MyBadRequestException({ password: 'Incorrect password' });
		}

		const tokensPayload: TokensPayload = { user: { id: user.id } };
		const { accessToken, refreshToken } = this.tokensService.generateTokens(
			tokensPayload
		);

		this.tokensService.setRefreshTokenCookie(refreshToken, res);
		return { accessToken };
	}

	refreshTokens(req: GraphQLReqType, res: GraphQLResType) {
		const tokensPayload = this.tokensService.getPayloadFromRefreshToken(
			req
		);
		const { accessToken, refreshToken } = this.tokensService.generateTokens(
			tokensPayload
		);

		this.tokensService.setRefreshTokenCookie(refreshToken, res);
		return { accessToken };
	}
}
