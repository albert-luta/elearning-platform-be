import { ObjectType, OmitType } from '@nestjs/graphql';
import { UserAssignment } from 'src/generated/prisma-nestjs-graphql/user-assignment/user-assignment.model';

@ObjectType()
export class UserAssignmentObject extends OmitType(UserAssignment, [
	'user',
	'assignment'
] as const) {}
