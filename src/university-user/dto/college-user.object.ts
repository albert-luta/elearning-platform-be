import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { CollegeObject } from 'src/college/dto/college.object';
import { CollegeUser } from 'src/generated/prisma-nestjs-graphql/college-user/college-user.model';
import { CourseUserObject } from './course-user.object';

@ObjectType()
export class CollegeUserObject extends OmitType(CollegeUser, [
	'universityUser',
	'college',
	'courseUsers'
] as const) {
	@Field(() => CollegeObject)
	college: CollegeObject;

	@Field(() => [CourseUserObject])
	coursesEnrolledAt: CourseUserObject[];
}
