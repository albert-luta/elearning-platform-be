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

	async createCourse(
		universityId: string,
		data: CreateCourseInput
	): Promise<CourseReturnType> {
		try {
			const course = await this.prisma.course.create({
				data: {
					...data,
					universityId
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
			const relatedSections = {
				where: {
					AND: {
						courseId: id,
						universityId
					}
				}
			};
			const sections = await this.prisma.section.findMany(
				relatedSections
			);
			const relatedActivities = {
				where: {
					sectionId: {
						in: sections.map((s) => s.id)
					}
				}
			};
			const activities = await this.prisma.activity.findMany(
				relatedActivities
			);
			const relatedSpecificActivities = {
				where: {
					activityId: {
						in: activities.map((a) => a.id)
					}
				}
			};
			await this.prisma.$transaction([
				this.prisma.resource.deleteMany(relatedSpecificActivities),
				this.prisma.quiz.deleteMany(relatedSpecificActivities),
				this.prisma.assignment.deleteMany(relatedSpecificActivities),
				this.prisma.activity.deleteMany(relatedActivities),
				this.prisma.section.deleteMany(relatedSections)
			]);
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
