import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { ActivityReturnType } from './activity.types';

@Injectable({ scope: Scope.REQUEST })
export class ActivityLoader {
	constructor(private readonly prisma: PrismaService) {}

	readonly bySectionId = new DataLoader<string, ActivityReturnType[]>(
		async (ids) => {
			const baseActivities = await this.prisma.activity.findMany({
				where: {
					sectionId: {
						in: [...ids]
					}
				},
				orderBy: {
					createdAt: 'asc'
				}
			});

			const {
				resourcesIds,
				assignmentsIds,
				quizesIds,
				forumsIds,
				activitiesMap,
				sectionActivitiesIdsMap
			} = baseActivities.reduce<{
				resourcesIds: string[];
				assignmentsIds: string[];
				quizesIds: string[];
				forumsIds: string[];
				activitiesMap: Record<string, ActivityReturnType>;
				sectionActivitiesIdsMap: Record<string, string[]>;
			}>(
				(acc, curr) => {
					let idsToChange: Record<string, string[]>;
					switch (curr.type) {
						case ActivityType.RESOURCE:
							idsToChange = {
								resourcesIds: [...acc.resourcesIds, curr.id]
							};
							break;
						case ActivityType.ASSIGNMENT:
							idsToChange = {
								assignmentsIds: [...acc.assignmentsIds, curr.id]
							};
							break;
						case ActivityType.QUIZ:
							idsToChange = {
								quizesIds: [...acc.quizesIds, curr.id]
							};
							break;
						case ActivityType.FORUM:
						default:
							idsToChange = {
								forumsIds: [...acc.forumsIds, curr.id]
							};
					}

					return {
						...acc,
						...idsToChange,
						activitiesMap: {
							...acc.activitiesMap,
							[curr.id]: curr
						},
						sectionActivitiesIdsMap: {
							...acc.sectionActivitiesIdsMap,
							[curr.sectionId]: [
								...(acc.sectionActivitiesIdsMap[
									curr.sectionId
								] ?? []),
								curr.id
							]
						}
					};
				},
				{
					resourcesIds: [],
					assignmentsIds: [],
					quizesIds: [],
					forumsIds: [],
					activitiesMap: {},
					sectionActivitiesIdsMap: {}
				}
			);

			const activityTypes = await Promise.all([
				this.prisma.resource.findMany({
					where: {
						activityId: {
							in: resourcesIds
						}
					}
				}),
				this.prisma.assignment.findMany({
					where: {
						activityId: {
							in: assignmentsIds
						}
					}
				}),
				this.prisma.quiz.findMany({
					where: {
						activityId: {
							in: quizesIds
						}
					}
				}),
				this.prisma.forum.findMany({
					where: {
						activityId: {
							in: forumsIds
						}
					}
				})
			]);
			activityTypes.forEach((activityType) => {
				activityType.forEach(({ activityId, ...activity }) => {
					activitiesMap[activityId] = {
						...activitiesMap[activityId],
						...activity
					};
				});
			});

			return ids.map(
				(id) =>
					sectionActivitiesIdsMap[id]?.map(
						(activityId) => activitiesMap[activityId]
					) ?? []
			);
		}
	);
}
