import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { RoleObject } from '../dto/role.object';

@Injectable({ scope: Scope.REQUEST })
export class RoleLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byId = new DataLoader<string, RoleObject>(async (ids) => {
		const roles = await this.prisma.role.findMany({
			where: {
				id: {
					in: [...ids]
				}
			}
		});
		const rolesMap = roles.reduce<Record<string, RoleObject>>(
			(acc, curr) => ({ ...acc, [curr.id]: curr }),
			{}
		);

		return ids.map((id) => rolesMap[id]);
	});
}
