import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { UniversityUserReturnType } from './university-user.types';

@Injectable({ scope: Scope.REQUEST })
export class UniversityUserLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byId = new DataLoader<string, UniversityUserReturnType>(
		async (ids) => {
			const universityUser = await this.prisma.universityUser.findMany({
				where: {
					id: {
						in: [...ids]
					}
				}
			});
			const universityUserMap = universityUser.reduce<
				Record<string, UniversityUserReturnType>
			>(
				(acc, curr) => ({
					...acc,
					[curr.id]: curr
				}),
				{}
			);

			return ids.map((id) => universityUserMap[id]);
		}
	);
}
