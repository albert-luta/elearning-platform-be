import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    password = "password",
    fatherInitial = "fatherInitial"
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum' })
