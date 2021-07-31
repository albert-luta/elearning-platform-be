import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { UserAssignment } from 'src/generated/prisma-nestjs-graphql/user-assignment/user-assignment.model';
import { UserObject } from 'src/user/dto/user.object';

@ObjectType()
export class UserAssignmentObject extends OmitType(UserAssignment, [
	'user',
	'assignment'
] as const) {
	@Field(() => UserObject)
	user: UserObject;
}
