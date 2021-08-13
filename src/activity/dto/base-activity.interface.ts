import { Field, InterfaceType } from '@nestjs/graphql';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';
import { AssignmentObject } from './assignment.object';
import { ForumObject } from '../../forum/dto/forum.object';
import { QuizObject } from './quiz.object';
import { ResourceObject } from './resource.object';

@InterfaceType({
	resolveType(activity) {
		switch (activity.type) {
			case ActivityType.RESOURCE:
				return ResourceObject;
			case ActivityType.ASSIGNMENT:
				return AssignmentObject;
			case ActivityType.QUIZ:
				return QuizObject;
			case ActivityType.FORUM:
				return ForumObject;
			default:
				return null;
		}
	}
})
export abstract class BaseActivityInterface {
	@Field()
	id: string;

	@Field()
	universityId: string;

	@Field()
	sectionId: string;

	@Field()
	type: string;

	@Field()
	createdAt: Date;

	@Field()
	name: string;

	@Field(() => String, { nullable: true })
	description: string | null;

	@Field(() => [String])
	files: string[];
}
