import { ObjectType, OmitType } from '@nestjs/graphql';
import { Section } from 'src/generated/prisma-nestjs-graphql/section/section.model';

@ObjectType()
export class SectionObject extends OmitType(Section, [
	'university',
	'course'
] as const) {}
