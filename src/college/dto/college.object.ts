import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { CourseObject } from 'src/course/dto/course.object';
import { College } from 'src/generated/prisma-nestjs-graphql/college/college.model';

@ObjectType()
export class CollegeObject extends OmitType(College, [
	'university',
	'courses'
] as const) {
	@Field(() => [CourseObject])
	courses: CourseObject[];
}
