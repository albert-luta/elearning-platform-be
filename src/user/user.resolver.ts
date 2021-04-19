import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { User } from './decorators/user.decorator';
import { UserObject } from './dto/user.object';
import { UserService } from './user.service';
import {
	GroupedByRoleUniversitiesResolverReturnType,
	UserResolverReturnType
} from './user.types';

@Resolver(() => UserObject)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => UserObject)
	me(@User() user: UserType): Promise<UserResolverReturnType> {
		return this.userService.getUser(user.id);
	}

	@ResolveField()
	groupedByRoleUniversities(
		@Parent() user: UserObject
	): Promise<GroupedByRoleUniversitiesResolverReturnType> {
		return this.userService.getUserGroupedByRoleUniversities(user.id);
	}
}
