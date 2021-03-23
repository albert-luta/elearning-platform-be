import { ObjectType, OmitType } from '@nestjs/graphql';
import { RegisterUserInput } from './register-user.input';

@ObjectType()
export class User extends OmitType(
	RegisterUserInput,
	['password'],
	ObjectType
) {}
