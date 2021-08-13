import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserLoader } from 'src/user/user.loader';
import { UserReturnType } from 'src/user/user.types';
import { RoleObject } from '../dto/role.object';
import { UniversityUserObject } from '../dto/university-user.object';
import { UniversityUserReturnType } from '../forum.types';
import { RoleLoader } from '../loaders/role.loader';

@Resolver(() => UniversityUserObject)
export class UniversityUserResolver {
	constructor(
		private readonly userLoader: UserLoader,
		private readonly roleLoader: RoleLoader
	) {}

	@ResolveField()
	user(
		@Parent() universityUser: UniversityUserReturnType
	): Promise<UserReturnType> {
		try {
			return this.userLoader.byId.load(universityUser.userId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	@ResolveField()
	role(
		@Parent() universityUser: UniversityUserReturnType
	): Promise<RoleObject> {
		try {
			return this.roleLoader.byId.load(universityUser.roleId);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
