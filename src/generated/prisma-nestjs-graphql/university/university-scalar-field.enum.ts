import { registerEnumType } from '@nestjs/graphql';

export enum UniversityScalarFieldEnum {
    id = "id",
    name = "name",
    logo = "logo"
}

registerEnumType(UniversityScalarFieldEnum, { name: 'UniversityScalarFieldEnum' })
