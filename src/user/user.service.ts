import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import {
	GroupedByRoleUniversitiesResolverReturnType,
	UserResolverReturnType
} from './user.types';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(id: string): Promise<UserResolverReturnType> {
		const res = await this.prisma.user.findUnique({
			where: {
				id
			}
		});

		if (res == null) {
			throw new NotFoundException();
		}

		const { password, ...user } = res;
		return user;
	}

	async getUserGroupedByRoleUniversities(
		userId: string
	): Promise<GroupedByRoleUniversitiesResolverReturnType> {
		const universities = await this.prisma.universityUser.findMany({
			where: {
				userId
			},
			select: {
				role: {
					select: {
						name: true
					}
				},
				university: true
			}
		});

		const manipulated = universities.reduce<{
			roles: Record<string, number | undefined>;
			groupedUniversities: GroupedByRoleUniversitiesResolverReturnType;
		}>(
			(acc, curr) => {
				const roleIndex = acc.roles[curr.role.name];

				if (roleIndex == null) {
					return {
						roles: {
							...acc.roles,
							[curr.role.name]: acc.groupedUniversities.length
						},
						groupedUniversities: [
							...acc.groupedUniversities,
							{
								role: curr.role.name,
								universities: [curr.university]
							}
						]
					};
				}

				const oldGroup = acc.groupedUniversities[roleIndex];
				const updatedGroup: typeof oldGroup = {
					role: oldGroup.role,
					universities: [...oldGroup.universities, curr.university]
				};

				return {
					roles: acc.roles,
					groupedUniversities: [
						...acc.groupedUniversities.slice(0, roleIndex),
						updatedGroup,
						...acc.groupedUniversities.slice(roleIndex + 1)
					]
				};
			},
			{ roles: {}, groupedUniversities: [] }
		);

		return manipulated.groupedUniversities;
	}
}
