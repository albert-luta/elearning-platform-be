import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UniversityUserReturnType } from './university-user.types';

@Injectable()
export class UniversityUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUniversityUsers(
		universityId: string
	): Promise<UniversityUserReturnType[]> {
		try {
			const universityUsers = await this.prisma.universityUser.findMany({
				where: {
					universityId
				}
			});

			return universityUsers;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
