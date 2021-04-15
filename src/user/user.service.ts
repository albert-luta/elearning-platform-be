import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async getUser(id: string) {
		const { password, ...user } = (await this.prisma.user.findUnique({
			where: {
				id
			}
		})) as User;

		return user;
	}

	async getUserCompanies(userId: string) {
		const companies = await this.prisma.companyUser.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				role: true,
				company: true
			}
		});

		return companies.map(({ company, ...companyUser }) => ({
			...companyUser,
			...company
		}));
	}
}
