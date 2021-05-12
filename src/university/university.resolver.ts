import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { UserType } from 'src/my-graphql/my-graphql.types';
import { User } from 'src/user/decorators/user.decorator';
import { CreateUniversityInput } from './dto/create-university.input';
import { UniversityObject } from './dto/university.object';
import { UniversityService } from './university.service';
import { UniversityReturnType } from './university.types';

@Resolver()
export class UniversityResolver {
	constructor(private readonly universityService: UniversityService) {}

	@Mutation(() => UniversityObject)
	createUniversity(
		@User() user: UserType,
		@Args('university') university: CreateUniversityInput,
		@Args({ name: 'logo', type: () => GraphQLUpload, nullable: true })
		logo?: FileUpload
	): Promise<UniversityReturnType> {
		return this.universityService.createUniversity(
			user.id,
			university,
			logo
		);
	}
}
