import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UniversityUserObject } from 'src/university-user/dto/university-user.object';
import { UniversityUserService } from './university-user.service';
import { InternalServerErrorException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { FileService } from 'src/global/file/file.service';
import { UserLoader } from 'src/user/user.loader';
import { UserReturnType } from 'src/user/user.types';
import {
	CollegeUserReturnType,
	UniversityUserReturnType
} from './university-user.types';
import { RoleLoader } from './loaders/role.loader';
import { RoleObject } from './dto/role.object';
import { CollegeUserLoader } from './loaders/college-user.loader';

@Resolver(() => UniversityUserObject)
export class UniversityUserResolver {
	constructor(
		private readonly universityUserService: UniversityUserService,
		private readonly userLoader: UserLoader,
		private readonly roleLoader: RoleLoader,
		private readonly fileService: FileService,
		private readonly collegeUserLoader: CollegeUserLoader
	) {}

	@Scopes('read:university-users')
	@Query(() => [UniversityUserObject])
	universityUsers(
		@Args('universityId') universityId: string
	): Promise<UniversityUserReturnType[]> {
		return this.universityUserService.getUniversityUsers(universityId);
	}

	// createUniversityUser
	// updateUniversityUser
	// deleteUniversityUser
	//
	// resolve type
	// collegesEnrolledAt
	// coursesEnrolledAt
	// course
	// college

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

	@ResolveField()
	collegesEnrolledAt(
		@Parent() universityUser: UniversityUserReturnType
	): Promise<CollegeUserReturnType[]> {
		try {
			return this.collegeUserLoader.byUniversityUserId.load(
				universityUser.id
			);
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
