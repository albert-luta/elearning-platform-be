import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    avatar = "avatar",
    fatherInitial = "fatherInitial",
    password = "password"
}

registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum' })
