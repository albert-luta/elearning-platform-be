import { registerEnumType } from '@nestjs/graphql';

export enum ScopeScalarFieldEnum {
    id = "id",
    name = "name"
}

registerEnumType(ScopeScalarFieldEnum, { name: 'ScopeScalarFieldEnum' })
