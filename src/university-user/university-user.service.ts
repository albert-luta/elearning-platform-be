import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { MyBadRequestError } from 'src/general/error-handling/errors/my-bad-request.error';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CollegeToEnrollAtInput } from './dto/college-to-enroll-at.input';
import { CreateUniversityUserInput } from './dto/create-university-user.input';
import { UpdateUniversityUserInput } from './dto/update-university-user.input';
import { UniversityUserReturnType } from './university-user.types';

@Injectable()
export class UniversityUserService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	private async enrollUserToCollegesAndCourses(
		universityUserId: string,
		collegesToEnrollAt: CollegeToEnrollAtInput[]
	): Promise<void> {
		await Promise.all(
			collegesToEnrollAt.map((college) =>
				this.prisma.collegeUser.create({
					data: {
						universityUserId,
						collegeId: college.id,
						courseUsers: {
							createMany: {
								data: college.coursesToEnrollAt.map(
									(course) => ({
										courseId: course.id
									})
								)
							}
						}
					}
				})
			)
		);
	}

	async getUniversityUser(
		id: string
	): Promise<UniversityUserReturnType | null> {
		try {
			const universityUser = await this.prisma.universityUser.findUnique({
				where: {
					id
				}
			});

			return universityUser;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getUniversityUsers(
		universityId: string
	): Promise<UniversityUserReturnType[]> {
		try {
			const universityUsers = await this.prisma.universityUser.findMany({
				where: {
					universityId
				}
			});

			return universityUsers;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createUniversityUser(
		universityId: string,
		userId: string,
		data: CreateUniversityUserInput
	): Promise<UniversityUserReturnType> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					email: data.userEmail
				}
			});
			if (!user) {
				throw new MyBadRequestError({
					userEmail: 'There is no user registered with this email'
				});
			}
			if (userId === user.id) {
				throw new MyBadRequestError({
					userEmail: 'You cannot enroll yourself'
				});
			}

			const alreadyCreatedUniversityUser = await this.prisma.universityUser.findUnique(
				{
					where: {
						universityId_userId: {
							universityId,
							userId: user.id
						}
					}
				}
			);
			if (alreadyCreatedUniversityUser) {
				throw new MyBadRequestError({
					userEmail: 'User is already enrolled'
				});
			}

			const universityUser = await this.prisma.universityUser.create({
				data: {
					universityId,
					userId: user.id,
					roleId: data.roleId
				}
			});
			await this.enrollUserToCollegesAndCourses(
				universityUser.id,
				data.collegesToEnrollAt
			);

			return universityUser;
		} catch (e) {
			if (e instanceof MyBadRequestError) {
				throw new MyBadRequestException(e.data);
			}

			throw new InternalServerErrorException();
		}
	}

	async updateUniversityUser(
		id: string,
		{ roleId, collegesToEnrollAt }: UpdateUniversityUserInput
	): Promise<UniversityUserReturnType> {
		try {
			await this.prisma.$transaction([
				this.prisma.universityUser.update({
					where: {
						id
					},
					data: {
						roleId
					}
				}),
				this.prisma.collegeUser.deleteMany({
					where: {
						universityUserId: id
					}
				})
			]);

			const [universityUser] = await Promise.all([
				this.prisma.universityUser.findUnique({
					where: {
						id
					}
				}),
				this.enrollUserToCollegesAndCourses(id, collegesToEnrollAt)
			]);
			if (!universityUser) {
				throw new Error(this.NOT_FOUND);
			}

			return universityUser;
		} catch (e) {
			if (e.code === 'P2025' || e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteUniversityUser(id: string): Promise<UniversityUserReturnType> {
		try {
			const universityUser = await this.prisma.universityUser.delete({
				where: {
					id
				}
			});

			return universityUser;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}

// TODO: create/update - enroll admins to every college and course
