import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UniversityUser } from 'src/generated/prisma-nestjs-graphql/university-user/university-user.model';
import { UserObject } from 'src/user/dto/user.object';
import { RoleObject } from './role.object';

@ObjectType()
export class UniversityUserObject extends OmitType(UniversityUser, [
	'university',
	'user',
	'role',
	'collegeUsers',
	'questionCategories',
	'forums',
	'forumComments'
] as const) {
	@Field(() => UserObject)
	user: UserObject;

	@Field(() => RoleObject)
	role: RoleObject;
}
