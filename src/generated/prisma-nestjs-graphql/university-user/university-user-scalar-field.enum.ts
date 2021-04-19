import { registerEnumType } from '@nestjs/graphql';

export enum UniversityUserScalarFieldEnum {
    universityId = "universityId",
    userId = "userId",
    roleId = "roleId"
}

registerEnumType(UniversityUserScalarFieldEnum, { name: 'UniversityUserScalarFieldEnum' })
