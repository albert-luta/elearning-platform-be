import { registerEnumType } from '@nestjs/graphql';

export enum CompanyUserScalarFieldEnum {
    id = "id",
    companyId = "companyId",
    userId = "userId",
    role = "role"
}

registerEnumType(CompanyUserScalarFieldEnum, { name: 'CompanyUserScalarFieldEnum' })
