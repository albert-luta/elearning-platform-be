import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { CourseObject } from 'src/course/dto/course.object';
import { CourseUser } from 'src/generated/prisma-nestjs-graphql/course-user/course-user.model';

@ObjectType()
export class CourseUserObject extends OmitType(CourseUser, [
	'collegeUser',
	'course'
] as const) {
	@Field(() => CourseObject)
	course: CourseObject;
}
