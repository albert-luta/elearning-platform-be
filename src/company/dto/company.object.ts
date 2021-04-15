import { ObjectType, OmitType } from '@nestjs/graphql';
import { Company } from 'src/generated/prisma-nestjs-graphql/company/company.model';

@ObjectType()
export class CompanyObject extends OmitType(Company, [
	'companyUser'
] as const) {}
