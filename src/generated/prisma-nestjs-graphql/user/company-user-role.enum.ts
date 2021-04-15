import { registerEnumType } from '@nestjs/graphql';

export enum CompanyUserRole {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

registerEnumType(CompanyUserRole, { name: 'CompanyUserRole' })
