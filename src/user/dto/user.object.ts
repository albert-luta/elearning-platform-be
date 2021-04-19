import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/generated/prisma-nestjs-graphql/user/user.model';
import { GroupedByRoleUniversitiesObject } from './grouped-by-role-universities.object';

@ObjectType()
export class UserObject extends OmitType(User, [
	'password',
	'universityUsers'
] as const) {
	@Field(() => [GroupedByRoleUniversitiesObject])
	groupedByRoleUniversities: GroupedByRoleUniversitiesObject[];
}
