import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Course } from 'src/generated/prisma-nestjs-graphql/course/course.model';
import { ActivityGradeObject } from './activity-grade.object';

@ObjectType()
export class CourseObject extends OmitType(Course, [
	'college',
	'university',
	'sections',
	'courseUsers'
] as const) {
	@Field(() => [ActivityGradeObject])
	activitiesGrade: ActivityGradeObject[];
}
