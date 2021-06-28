import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { ActivityReturnType } from 'src/activity/activity.types';
import { BaseActivityInterface } from 'src/activity/dto/base-activity.interface';
import { Section } from 'src/generated/prisma-nestjs-graphql/section/section.model';

@ObjectType()
export class SectionObject extends OmitType(Section, [
	'university',
	'course',
	'activities'
] as const) {
	@Field(() => [BaseActivityInterface])
	activities: ActivityReturnType[];
}
