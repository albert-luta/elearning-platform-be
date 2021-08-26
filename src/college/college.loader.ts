import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CollegeReturnType } from './college.types';

@Injectable({ scope: Scope.REQUEST })
export class CollegeLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byActivityId = new DataLoader<string, CollegeReturnType>(
		async (ids) => {
			const activities = await this.prisma.activity.findMany({
				where: {
					id: {
						in: [...ids]
					}
				},
				include: {
					section: {
						select: {
							course: {
								include: {
									college: true
								}
							}
						}
					}
				}
			});
			const collegesMap = activities.reduce<
				Record<string, CollegeReturnType>
			>(
				(acc, curr) => ({
					...acc,
					[curr.id]: curr.section.course.college
				}),
				{}
			);

			return ids.map((id) => collegesMap[id]);
		}
	);

	readonly byId = new DataLoader<string, CollegeReturnType>(async (ids) => {
		const colleges = await this.prisma.college.findMany({
			where: {
				id: {
					in: [...ids]
				}
			}
		});
		const collegesMap = colleges.reduce<Record<string, CollegeReturnType>>(
			(acc, curr) => ({
				...acc,
				[curr.id]: curr
			}),
			{}
		);

		return ids.map((id) => collegesMap[id]);
	});
}
