import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { PrismaError } from 'prisma-error-enum';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CollegeReturnType } from './college.types';
import { CreateCollegeInput } from './dto/create-college.input';

@Injectable()
export class CollegeService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
	) {}

	async getColleges(universityId: string): Promise<CollegeReturnType[]> {
		try {
			const colleges = await this.prisma.college.findMany({
				where: {
					AND: [
						{
							universityId
						},
						{
							collegeUsers: {
								some: {}
							}
						}
					]
				},
				orderBy: {
					name: 'asc'
				}
			});

			return colleges;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async createCollege(
		universityId: string,
		userId: string,
		data: CreateCollegeInput
	): Promise<CollegeReturnType> {
		try {
			const college = await this.prisma.college.create({
				data: {
					...data,
					universityId,
					collegeUsers: {
						create: {
							universityUser: {
								connect: {
									universityId_userId: {
										universityId,
										userId
									}
								}
							}
						}
					}
				}
			});

			return college;
		} catch (e) {
			if (
				e.code === PrismaError.ForeignConstraintViolation &&
				e.meta.field_name === 'College_universityId_fkey (index)'
			) {
				throw new MyBadRequestException({
					univeristy: 'This university doesn"t exist anymore'
				});
			} else if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('name')
			) {
				throw new MyBadRequestException({
					name: 'There is already a college with this name'
				});
			}

			throw new InternalServerErrorException();
		}
	}

	async updateCollege(
		universityId: string,
		id: string,
		data: CreateCollegeInput
	): Promise<CollegeReturnType> {
		try {
			const college = await this.prisma.college.update({
				where: {
					id_universityId: {
						id,
						universityId
					}
				},
				data
			});

			return college;
		} catch (e) {
			if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('name')
			) {
				throw new MyBadRequestException({
					name: 'There is already a college with this name'
				});
			} else if (e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteCollege(
		universityId: string,
		id: string
	): Promise<CollegeReturnType> {
		try {
			const college = await this.prisma.college.delete({
				where: {
					id_universityId: {
						id,
						universityId
					}
				}
			});
			await this.fileService.deleteCollegeFiles({
				universityId,
				collegeId: id
			});

			return college;
		} catch (e) {
			if (e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}
}
