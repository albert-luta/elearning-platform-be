import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from '@nestjs/common';
import { PrismaError } from 'prisma-error-enum';
import { MyBadRequestException } from 'src/general/error-handling/exceptions/my-bad-request.exception';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CollegeReturnType } from './college.types';
import { CreateCollegeInput } from './dto/create-college.input';

@Injectable()
export class CollegeService {
	constructor(private readonly prisma: PrismaService) {}

	async getColleges(universityId: string): Promise<CollegeReturnType[]> {
		try {
			const colleges = await this.prisma.college.findMany({
				where: {
					universityId
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
		data: CreateCollegeInput
	): Promise<CollegeReturnType> {
		try {
			const college = await this.prisma.college.create({
				data: {
					...data,
					universityId
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
			const relatedCourses = {
				where: {
					AND: {
						collegeId: id,
						universityId
					}
				}
			};
			const courses = await this.prisma.course.findMany(relatedCourses);
			const relatedSections = {
				where: {
					courseId: {
						in: courses.map((c) => c.id)
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
				this.prisma.assignment.deleteMany(relatedSpecificActivities),
				this.prisma.quiz.deleteMany(relatedSpecificActivities),
				this.prisma.activity.deleteMany(relatedActivities),
				this.prisma.section.deleteMany(relatedSections),
				this.prisma.course.deleteMany(relatedCourses)
			]);
			const college = await this.prisma.college.delete({
				where: {
					id_universityId: {
						id,
						universityId
					}
				}
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
