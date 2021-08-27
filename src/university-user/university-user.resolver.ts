import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UniversityUserObject } from 'src/university-user/dto/university-user.object';
import { UniversityUserService } from './university-user.service';
import { InternalServerErrorException } from '@nestjs/common';
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver
} from '@nestjs/graphql';
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
import { CreateUniversityUserInput } from './dto/create-university-user.input';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { UpdateUniversityUserInput } from './dto/update-university-user.input';

@Resolver(() => UniversityUserObject)
export class UniversityUserResolver {
	constructor(
		private readonly universityUserService: UniversityUserService,
		private readonly userLoader: UserLoader,
		private readonly roleLoader: RoleLoader,
		private readonly fileService: FileService,
		private readonly collegeUserLoader: CollegeUserLoader
	) {}

	@Scopes('read:university-user')
	@Query(() => UniversityUserObject, { nullable: true })
	universityUser(
		@Args('id') id: string
	): Promise<UniversityUserReturnType | null> {
		return this.universityUserService.getUniversityUser(id);
	}

	@Scopes('read:university-users')
	@Query(() => [UniversityUserObject])
	universityUsers(
		@Args('universityId') universityId: string
	): Promise<UniversityUserReturnType[]> {
		return this.universityUserService.getUniversityUsers(universityId);
	}

	@Scopes('create:university-user')
	@Mutation(() => UniversityUserObject)
	createUniversityUser(
		@User() user: UserType,
		@UniversityId() universityId: string,
		@Args('data') data: CreateUniversityUserInput
	): Promise<UniversityUserReturnType> {
		return this.universityUserService.createUniversityUser(
			universityId,
			user.id,
			data
		);
	}

	@Scopes('update:university-user')
	@Mutation(() => UniversityUserObject)
	updateUniversityUser(
		@Args('id') id: string,
		@Args('data') data: UpdateUniversityUserInput
	): Promise<UniversityUserReturnType> {
		return this.universityUserService.updateUniversityUser(id, data);
	}

	@Scopes('delete:university-user')
	@Mutation(() => UniversityUserObject)
	deleteUniversityUser(
		@Args('id') id: string
	): Promise<UniversityUserReturnType> {
		return this.universityUserService.deleteUniversityUser(id);
	}

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
