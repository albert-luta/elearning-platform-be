import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { User } from './decorators/user.decorator';
import { UserObject } from './dto/user.object';
import { UserService } from './user.service';

@Resolver(() => UserObject)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => UserObject)
	me(@User() user: UserType) {
		return this.userService.getUser(user.id);
	}

	@ResolveField()
	companies(@Parent() user: UserObject) {
		return this.userService.getUserCompanies(user.id);
	}
}
