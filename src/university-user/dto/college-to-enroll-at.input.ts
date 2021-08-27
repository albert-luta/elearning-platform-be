import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CourseToEnrollAtInput } from './course-to-enroll-at.input';

@InputType()
export class CollegeToEnrollAtInput {
	@Field()
	@IsNotEmpty()
	id: string;

	@Field(() => [CourseToEnrollAtInput])
	coursesToEnrollAt: CourseToEnrollAtInput[];
}
