import { ObjectType, OmitType } from '@nestjs/graphql';
import { Course } from 'src/generated/prisma-nestjs-graphql/course/course.model';

@ObjectType()
export class CourseObject extends OmitType(Course, [
	'college',
	'university',
	'sections',
	'courseUsers'
] as const) {}
