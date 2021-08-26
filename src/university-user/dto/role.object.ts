import { ObjectType, OmitType } from '@nestjs/graphql';
import { Role } from 'src/generated/prisma-nestjs-graphql/role/role.model';

@ObjectType()
export class RoleObject extends OmitType(Role, [
	'scopes',
	'universityUsers'
] as const) {}
