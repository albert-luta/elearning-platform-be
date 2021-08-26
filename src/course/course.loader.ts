import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CourseReturnType } from './course.types';

@Injectable({ scope: Scope.REQUEST })
export class CourseLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byCollegeId = new DataLoader<string, CourseReturnType[]>(
		async (ids) => {
			const courses = await this.prisma.course.findMany({
				where: {
					AND: [
						{
							collegeId: {
								in: [...ids]
							}
						},
						{
							courseUsers: {
								some: {}
							}
						}
					]
				},
				orderBy: {
					name: 'asc'
				}
			});
			const coursesMap = courses.reduce<
				Record<string, CourseReturnType[]>
			>((acc, curr) => {
				return {
					...acc,
					[curr.collegeId]: [...(acc[curr.collegeId] ?? []), curr]
				};
			}, {});

			return ids.map((id) => coursesMap[id] ?? []);
		}
	);

	readonly byActivityId = new DataLoader<string, CourseReturnType>(
		async (ids) => {
			const activities = await this.prisma.activity.findMany({
				where: {
					id: {
						in: [...ids]
					}
				},
				include: {
					section: {
						include: {
							course: true
						}
					}
				}
			});
			const coursesMap = activities.reduce<
				Record<string, CourseReturnType>
			>((acc, curr) => ({ ...acc, [curr.id]: curr.section.course }), {});

			return ids.map((id) => coursesMap[id]);
		}
	);

	readonly byId = new DataLoader<string, CourseReturnType>(async (ids) => {
		const courses = await this.prisma.course.findMany({
			where: {
				id: {
					in: [...ids]
				}
			}
		});
		const coursesMap = courses.reduce<Record<string, CourseReturnType>>(
			(acc, curr) => ({
				...acc,
				[curr.id]: curr
			}),
			{}
		);

		return ids.map((id) => coursesMap[id]);
	});
}
