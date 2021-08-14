import { Field, ObjectType } from '@nestjs/graphql';
import { CollegeObject } from 'src/college/dto/college.object';
import { CourseObject } from 'src/course/dto/course.object';
import { BaseActivityInterface } from './base-activity.interface';

@ObjectType({
	implements: () => [BaseActivityInterface]
})
export class AssignmentObject implements BaseActivityInterface {
	id: string;
	universityId: string;
	sectionId: string;
	createdAt: Date;
	name: string;
	description: string | null;
	files: Array<string>;
	type: string;
	college: CollegeObject;
	course: CourseObject;

	@Field()
	deadline: Date;

	@Field()
	maxGrade: number;
}
