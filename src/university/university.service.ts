import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UserRole } from 'src/auth/auth.types';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateUniversityInput } from './dto/create-university.input';
import { UniversityInput } from './dto/university.input';
import { UpdateUniversityInput } from './dto/update-university.input';
import { UniversityReturnType } from './university.types';

@Injectable()
export class UniversityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
	) {}

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

		if (res == null || res.role.name !== UserRole.ADMIN_UNIVERSITY) {
			return false;
		}
		return true;
	}

	async createUniversity(
		userId: string,
		{ name }: CreateUniversityInput,
		logo: FileUpload | undefined
	): Promise<UniversityReturnType> {
		try {
			const createdUniversity = await this.prisma.university.create({
				data: {
					name,
					universityUsers: {
						create: {
							user: {
								connect: {
									id: userId
								}
							},
							role: {
								connect: {
									name: UserRole.ADMIN_UNIVERSITY
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
		data: UpdateUniversityInput,
		logo: FileUpload | undefined
	): Promise<UniversityReturnType> {
		try {
			const isAuthorized = await this.isUserAuthorized(
				userId,
				universityId
			);
			if (!isAuthorized) {
				throw new Error('unauthorized');
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
			if (e.message === 'unauthorized') {
				throw new ForbiddenException();
			}

			throw new InternalServerErrorException();
		}
	}

	async leaveUniversity(
		userId: string,
		university: UniversityInput
	): Promise<UniversityReturnType> {
		try {
			await this.prisma.universityUser.delete({
				where: {
					universityId_userId: {
						userId,
						universityId: university.id
					}
				}
			});
			const enrolledUsers = await this.prisma.universityUser.findMany({
				where: {
					universityId: university.id
				}
			});
			if (!enrolledUsers.length) {
				await this.deleteUniversity(userId, university, true);
			}

			return university;
		} catch (e) {
			if (e.code === 'P2025') {
				throw new MyBadRequestException({
					relation: 'User is not enrolled at this university'
				});
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteUniversity(
		userId: string,
		university: UniversityInput,
		skipAuthCheck = false
	): Promise<UniversityReturnType> {
		try {
			const isAuthorized = await this.isUserAuthorized(
				userId,
				university.id
			);
			if (!skipAuthCheck && !isAuthorized) {
				throw new Error('unauthorized');
			}

			const related = {
				where: {
					universityId: university.id
				}
			};
			const universityUsers = this.prisma.universityUser.deleteMany(
				related
			);
			const courses = this.prisma.course.deleteMany(related);
			const colleges = this.prisma.college.deleteMany(related);
			const uni = this.prisma.university.delete({
				where: {
					id: university.id
				}
			});
			await this.prisma.$transaction([
				universityUsers,
				courses,
				colleges,
				uni
			]);

			return university;
		} catch (e) {
			if (e.message === 'unauthorized') {
				throw new ForbiddenException();
			}

			throw new InternalServerErrorException();
		}
	}
}
