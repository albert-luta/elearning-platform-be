import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UserRole } from 'src/auth/auth.types';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateUniversityInput } from './dto/create-university.input';
import { UniversityReturnType } from './university.types';

@Injectable()
export class UniversityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';
	private readonly UNAUTHORIZED = 'UNAUTHORIZED';

	private async isUserAuthorized(
		userId: string,
		universityId: string
	): Promise<boolean> {
		const res = await this.prisma.universityUser.findUnique({
			where: {
				universityId_userId: {
					userId,
					universityId
				}
			},
			select: {
				role: {
					select: {
						name: true
					}
				}
			}
		});

		if (res == null || res.role.name !== UserRole.ADMIN) {
			return false;
		}
		return true;
	}

	async createUniversity(
		userId: string,
		data: CreateUniversityInput,
		logo: FileUpload | undefined
	): Promise<UniversityReturnType> {
		try {
			const createdUniversity = await this.prisma.university.create({
				data: {
					...data,
					universityUsers: {
						create: {
							user: {
								connect: {
									id: userId
								}
							},
							role: {
								connect: {
									name: UserRole.ADMIN
								}
							}
						}
					}
				}
			});
			if (!logo) return createdUniversity;

			const logoPath = await this.fileService.createUniversityLogo(
				createdUniversity.id,
				logo
			);
			await this.prisma.university.update({
				where: {
					id: createdUniversity.id
				},
				data: {
					logo: logoPath
				}
			});

			return {
				...createdUniversity,
				logo: this.fileService.getFileUrl(logoPath)
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateUniversity(
		userId: string,
		universityId: string,
		data: CreateUniversityInput,
		logo: FileUpload | undefined
	): Promise<UniversityReturnType> {
		try {
			const isAuthorized = await this.isUserAuthorized(
				userId,
				universityId
			);
			if (!isAuthorized) {
				throw new Error(this.UNAUTHORIZED);
			}

			const university = await this.prisma.university.update({
				where: {
					id: universityId
				},
				data: {
					...data,
					logo:
						logo &&
						(await this.fileService.createUniversityLogo(
							universityId,
							logo
						))
				}
			});

			return {
				...university,
				logo:
					university.logo &&
					this.fileService.getFileUrl(university.logo)
			};
		} catch (e) {
			if (e.message === this.UNAUTHORIZED) {
				throw new ForbiddenException();
			}

			throw new InternalServerErrorException();
		}
	}

	async leaveUniversity(
		userId: string,
		universityId: string
	): Promise<UniversityReturnType> {
		try {
			const university = await this.prisma.university.findUnique({
				where: {
					id: universityId
				}
			});
			if (!university) {
				throw new Error(this.NOT_FOUND);
			}

			await this.prisma.universityUser.delete({
				where: {
					universityId_userId: {
						userId,
						universityId
					}
				}
			});
			const enrolledUsers = await this.prisma.universityUser.findMany({
				where: {
					universityId
				}
			});
			if (!enrolledUsers.length) {
				await this.deleteUniversity(userId, universityId, true);
			}

			return university;
		} catch (e) {
			if (e.code === 'P2025') {
				throw new MyBadRequestException({
					relation: 'User is not enrolled at this university'
				});
			} else if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteUniversity(
		userId: string,
		universityId: string,
		skipAuthCheck = false
	): Promise<UniversityReturnType> {
		try {
			const isAuthorized = await this.isUserAuthorized(
				userId,
				universityId
			);
			if (!skipAuthCheck && !isAuthorized) {
				throw new Error(this.UNAUTHORIZED);
			}

			const related = {
				where: {
					universityId
				}
			};

			const university = await this.prisma.university.findUnique({
				where: {
					id: universityId
				}
			});
			if (!university) {
				throw new Error(this.NOT_FOUND);
			}

			const universityUsers = this.prisma.universityUser.deleteMany(
				related
			);
			const uni = this.prisma.university.delete({
				where: {
					id: universityId
				}
			});
			const colleges = this.prisma.college.deleteMany(related);
			const courses = this.prisma.course.deleteMany(related);
			const sections = this.prisma.section.deleteMany(related);
			const activities = this.prisma.activity.deleteMany(related);
			const resources = this.prisma.resource.deleteMany(related);
			const assignments = this.prisma.assignment.deleteMany(related);
			const quizes = this.prisma.quiz.deleteMany(related);
			await this.prisma.$transaction([
				universityUsers,
				resources,
				assignments,
				quizes,
				activities,
				sections,
				courses,
				colleges,
				uni
			]);

			return university;
		} catch (e) {
			if (e.message === this.UNAUTHORIZED) {
				throw new ForbiddenException();
			} else if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}
}
