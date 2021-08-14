import { InternalServerErrorException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FileService } from 'src/global/file/file.service';
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
		private readonly roleLoader: RoleLoader,
		private readonly fileService: FileService
	) {}

	@ResolveField()
	async user(
		@Parent() universityUser: UniversityUserReturnType
	): Promise<UserReturnType> {
		try {
			const { avatar, ...user } = await this.userLoader.byId.load(
				universityUser.userId
			);

			return {
				...user,
				avatar: avatar && this.fileService.getUrlFromDbFilePath(avatar)
			};
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
