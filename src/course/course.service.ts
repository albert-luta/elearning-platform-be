import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { PrismaError } from 'prisma-error-enum';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { FileService } from 'src/global/file/file.service';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CourseReturnType } from './course.types';
import { CreateCourseInput } from './dto/create-course.input';

@Injectable()
export class CourseService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fileService: FileService
	) {}

	private readonly NOT_FOUND = 'NOT_FOUND';

	async createCourse(
		universityId: string,
		userId: string,
		data: CreateCourseInput
	): Promise<CourseReturnType> {
		try {
			const universityUser = await this.prisma.universityUser.findUnique({
				where: {
					universityId_userId: {
						universityId,
						userId
					}
				}
			});
			if (!universityUser) {
				throw new Error(this.NOT_FOUND);
			}
			const course = await this.prisma.course.create({
				data: {
					...data,
					universityId,
					courseUsers: {
						create: {
							collegeUser: {
								connect: {
									universityUserId_collegeId: {
										universityUserId: universityUser.id,
										collegeId: data.collegeId
									}
								}
							}
						}
					}
				}
			});

			return course;
		} catch (e) {
			if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('name')
			) {
				throw new MyBadRequestException({
					name: 'There is already a course with this name'
				});
			} else if (e.message === this.NOT_FOUND) {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async updateCourse(
		universityId: string,
		id: string,
		data: CreateCourseInput
	): Promise<CourseReturnType> {
		try {
			const course = await this.prisma.course.update({
				where: {
					id_universityId: {
						id,
						universityId
					}
				},
				data
			});

			return course;
		} catch (e) {
			if (
				e.code === PrismaError.UniqueConstraintViolation &&
				e.meta.target.includes('name')
			) {
				throw new MyBadRequestException({
					name: 'There is already a course with this name'
				});
			} else if (e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}

	async deleteCourse(
		universityId: string,
		id: string
	): Promise<CourseReturnType> {
		try {
			const course = await this.prisma.course.delete({
				where: {
					id_universityId: {
						id,
						universityId
					}
				}
			});
			await this.fileService.deleteCourseFiles({
				universityId,
				collegeId: course.collegeId,
				courseId: id
			});

			return course;
		} catch (e) {
			if (e.code === 'P2025') {
				throw new NotFoundException();
			}

			throw new InternalServerErrorException();
		}
	}
}

// TODO: when creating a new course, enroll the admins
