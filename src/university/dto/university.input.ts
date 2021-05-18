import { InputType, OmitType } from '@nestjs/graphql';
import { UniversityObject } from './university.object';

@InputType()
export class UniversityInput extends OmitType(
	UniversityObject,
	[] as const,
	InputType
) {}
