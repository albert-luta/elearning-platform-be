import { InternalServerErrorException } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { RoleObject } from '../dto/role.object';

@Resolver(() => RoleObject)
export class RoleResolver {
	constructor(private readonly prisma: PrismaService) {}

	@Scopes('read:roles')
	@Query(() => [RoleObject])
	async roles(): Promise<RoleObject[]> {
		try {
			const roles = await this.prisma.role.findMany();

			return roles;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
