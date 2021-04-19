import { Field, ObjectType } from '@nestjs/graphql';
import { UniversityObject } from 'src/university/dto/university.object';

@ObjectType()
export class GroupedByRoleUniversitiesObject {
	@Field()
	role: string;

	@Field(() => [UniversityObject])
	universities: UniversityObject[];
}
