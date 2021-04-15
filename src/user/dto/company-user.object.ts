import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyObject } from 'src/company/dto/company.object';
import { CompanyUserRole } from 'src/generated/prisma-nestjs-graphql/user/company-user-role.enum';

@ObjectType()
export class CompanyUserObject extends CompanyObject {
	@Field(() => CompanyUserRole)
	role: CompanyUserRole;
}
