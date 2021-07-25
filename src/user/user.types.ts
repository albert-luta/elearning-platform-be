import { PrismaNullable } from 'src/general/utils/types';
import { UserObject } from 'src/user/dto/user.object';

export type UserReturnType = PrismaNullable<
	Omit<UserObject, 'groupedByRoleUniversities'>
>;

export type GroupedByRoleUniversitiesReturnType = PrismaNullable<
	UserObject['groupedByRoleUniversities']
>;
