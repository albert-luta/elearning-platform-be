import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CourseUserReturnType } from '../university-user.types';

@Injectable({ scope: Scope.REQUEST })
export class CourseUserLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byCollegeUserId = new DataLoader<string, CourseUserReturnType[]>(
		async (ids) => {
			const courseUsers = await this.prisma.courseUser.findMany({
				where: {
					collegeUserId: {
						in: [...ids]
					}
				}
			});
			const courseUsersMap = courseUsers.reduce<
				Record<string, CourseUserReturnType[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.collegeUserId]: [
						...(acc[curr.collegeUserId] ?? []),
						curr
					]
				}),
				{}
			);

			return ids.map((id) => courseUsersMap[id] ?? []);
		}
	);
}
