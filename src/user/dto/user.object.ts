import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from 'src/generated/prisma-nestjs-graphql/user/user.model';
import { CompanyUserObject } from './company-user.object';

@ObjectType()
export class UserObject extends OmitType(User, ['companyUser'] as const) {
	@Field(() => [CompanyUserObject])
	companies: CompanyUserObject[];
}
