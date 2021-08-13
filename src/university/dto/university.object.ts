import { ObjectType, OmitType } from '@nestjs/graphql';
import { University } from 'src/generated/prisma-nestjs-graphql/university/university.model';

@ObjectType()
export class UniversityObject extends OmitType(University, [
	'universityUsers',
	'colleges',
	'courses',
	'sections',
	'activities',
	'resources',
	'assignments',
	'quizes',
	'forums'
] as const) {}
