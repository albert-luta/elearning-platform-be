import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserInput } from './dto/register-user.input';
import * as argon2 from 'argon2';
import { PrismaError } from 'prisma-error-enum';
import { LoginUserInput } from './dto/login-user.input';
import { MySessionType } from 'src/decorators/MySession.decorator';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	async register({
		email,
		fatherInitial,
		firstName,
		lastName,
		password
	}: RegisterUserInput) {
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

			return createdUser;
		} catch (e) {
			if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('email')
			) {
				throw new BadRequestException('Email is already in use');
			}

			throw new InternalServerErrorException();
		}
	}

	async login(userProvided: LoginUserInput, session: MySessionType) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: userProvided.email
			}
		});
		if (user == null) {
			throw new BadRequestException(
				'There is no user registered with this email'
			);
		}

		const hasCorrectPassword = await argon2.verify(
			user.password,
			userProvided.password
		);
		if (hasCorrectPassword) {
			session.user = { id: user.id };

			return user;
		} else {
			throw new UnauthorizedException('Incorrect password');
		}
	}
}
