import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { UserRole } from 'src/auth/auth.types';
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
}
