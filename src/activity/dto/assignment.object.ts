import { Field, ObjectType } from '@nestjs/graphql';
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

	@Field()
	deadline: Date;

	@Field()
	maxGrade: number;
}
