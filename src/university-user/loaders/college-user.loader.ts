import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CollegeUserReturnType } from '../university-user.types';

@Injectable({ scope: Scope.REQUEST })
export class CollegeUserLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byUniversityUserId = new DataLoader<
		string,
		CollegeUserReturnType[]
	>(async (ids) => {
		const collegeUsers = await this.prisma.collegeUser.findMany({
			where: {
				universityUserId: {
					in: [...ids]
				}
			}
		});
		const collegeUsersMap = collegeUsers.reduce<
			Record<string, CollegeUserReturnType[]>
		>(
			(acc, curr) => ({
				...acc,
				[curr.universityUserId]: [
					...(acc[curr.universityUserId] ?? []),
					curr
				]
			}),
			{}
		);

		return ids.map((id) => collegeUsersMap[id] ?? []);
	});
}
