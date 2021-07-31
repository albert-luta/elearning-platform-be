import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UserReturnType } from './user.types';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byId = new DataLoader<string, UserReturnType>(async (ids) => {
		const users = await this.prisma.user.findMany({
			where: {
				id: {
					in: [...ids]
				}
			}
		});
		const usersMap = users.reduce<Record<string, UserReturnType>>(
			(acc, curr) => ({ ...acc, [curr.id]: curr }),
			{}
		);

		return ids.map((id) => usersMap[id]);
	});
}
