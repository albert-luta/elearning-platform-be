import { registerEnumType } from '@nestjs/graphql';

export enum CompanyScalarFieldEnum {
    id = "id",
    name = "name",
    logo = "logo"
}

registerEnumType(CompanyScalarFieldEnum, { name: 'CompanyScalarFieldEnum' })
