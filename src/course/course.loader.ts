import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CourseObject } from './dto/course.object';

@Injectable({ scope: Scope.REQUEST })
export class CourseLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly byCollegeId = new DataLoader<string, CourseObject[]>(
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
			const coursesMap = courses.reduce<Record<string, CourseObject[]>>(
				(acc, curr) => {
					return {
						...acc,
						[curr.collegeId]: [...(acc[curr.collegeId] ?? []), curr]
					};
				},
				{}
			);

			return ids.map((id) => coursesMap[id] ?? []);
		}
	);
}
