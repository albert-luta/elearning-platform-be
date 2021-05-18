import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UserRole } from 'src/auth/auth.types';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateUniversityInput } from './dto/create-university.input';
import { UniversityInput } from './dto/university.input';
import { UniversityReturnType } from './university.types';

@Injectable()
export class UniversityService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
	) {}

	async createUniversity(
		userId: string,
		{ name }: CreateUniversityInput,
		logo?: FileUpload
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
			if (logo) {
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
			}

			return {
				...createdUniversity,
				logo:
					createdUniversity.logo &&
					this.fileService.getFileUrl(createdUniversity.logo)
			};
		} catch (e) {
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
}
