import { PrismaNullable } from 'src/general/utils/types';
import { UserObject } from 'src/user/dto/user.object';

export type UserResolverReturnType = PrismaNullable<
	Omit<UserObject, 'groupedByRoleUniversities'>
>;

export type GroupedByRoleUniversitiesResolverReturnType = PrismaNullable<
	UserObject['groupedByRoleUniversities']
>;
