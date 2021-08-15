import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { ActivityGradeObject } from '../dto/activity-grade.object';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';

@Injectable({ scope: Scope.REQUEST })
export class ActivityGradeLoader {
	constructor(private readonly prisma: PrismaService) {}

	byCourseId(universityId: string, userId: string) {
		return new DataLoader<string, ActivityGradeObject[]>(async (ids) => {
			const identification = {
				activity: {
					section: {
						course: {
							courseUsers: {
								some: {
									collegeUser: {
										universityUser: {
											universityId,
											userId
										}
									}
								}
							}
						}
					}
				}
			};
			const courseIncludeStructure = {
				activity: {
					include: {
						section: true
					}
				}
			};

			const [assignments, quizes] = await Promise.all([
				this.prisma.assignment.findMany({
					where: {
						...identification
					},
					include: {
						...courseIncludeStructure,
						userAssignments: true
					}
				}),
				this.prisma.quiz.findMany({
					where: {
						...identification
					},
					include: {
						...courseIncludeStructure,
						userQuizes: {
							include: {
								userQuizQuestions: true
							}
						},
						quizQuestions: true
					}
				})
			]);

			const assignmentsMap = assignments.reduce<
				Record<string, ActivityGradeObject[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.activity.section.courseId]: [
						...(acc[curr.activity.section.courseId] ?? []),
						{
							activityId: curr.activityId,
							activityName: curr.activity.name,
							activityType: curr.activity.type as ActivityType,
							maxGrade: curr.maxGrade,
							grade: curr.userAssignments[0]?.grade ?? null
						}
					]
				}),
				{}
			);
			const quizesMap = quizes.reduce<
				Record<string, ActivityGradeObject[]>
			>(
				(acc, curr) => ({
					...acc,
					[curr.activity.section.courseId]: [
						...(acc[curr.activity.section.courseId] ?? []),
						{
							activityId: curr.activityId,
							activityName: curr.activity.name,
							activityType: curr.activity.type as ActivityType,
							maxGrade: curr.quizQuestions.reduce(
								(acc, curr) => acc + curr.maxGrade,
								0
							),
							grade:
								curr.userQuizes?.[0].userQuizQuestions.reduce<
									number | null
								>(
									(acc, { grade }) =>
										acc == null || grade == null
											? null
											: acc + grade,
									0
								) ?? null
						}
					]
				}),
				{}
			);

			return ids.map((id) => [
				...(assignmentsMap[id] ?? []),
				...(quizesMap[id] ?? [])
			]);
		});
	}
}
