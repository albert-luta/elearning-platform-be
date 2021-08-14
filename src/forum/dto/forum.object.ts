import { Field, ObjectType } from '@nestjs/graphql';
import { CollegeObject } from 'src/college/dto/college.object';
import { CourseObject } from 'src/course/dto/course.object';
import { BaseActivityInterface } from '../../activity/dto/base-activity.interface';
import { UniversityUserObject } from './university-user.object';

@ObjectType({
	implements: () => [BaseActivityInterface]
})
export class ForumObject implements BaseActivityInterface {
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
	universityUserId: string;

	@Field(() => UniversityUserObject)
	universityUser: UniversityUserObject;
}
