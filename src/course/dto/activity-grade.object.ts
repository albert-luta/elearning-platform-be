import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ActivityType } from 'src/generated/prisma-nestjs-graphql/prisma/activity-type.enum';

@ObjectType()
export class ActivityGradeObject {
	@Field()
	activityId: string;

	@Field()
	activityName: string;

	@Field(() => ActivityType)
	activityType: ActivityType;

	@Field(() => Float, { nullable: true })
	grade: number | null;

	@Field()
	maxGrade: number;
}
