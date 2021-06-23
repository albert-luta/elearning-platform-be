import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Scopes } from 'src/auth/decorators/scopes.decorator';
import { UniversityId } from 'src/university/decorators/university-id.decorator';
import { CreateSectionInput } from './dto/create-section.input';
import { SectionObject } from './dto/section.object';
import { SectionService } from './section.service';
import { SectionReturnType } from './section.types';

@Resolver()
export class SectionResolver {
	constructor(private readonly sectionService: SectionService) {}

	@Scopes('read:sections')
	@Query(() => [SectionObject])
	sections(@Args('courseId') courseId: string): Promise<SectionReturnType[]> {
		return this.sectionService.getSections(courseId);
	}

	@Scopes('create:section')
	@Mutation(() => SectionObject)
	createSection(
		@UniversityId() universityId: string,
		@Args('data') data: CreateSectionInput
	): Promise<SectionReturnType> {
		return this.sectionService.createSection(universityId, data);
	}

	@Scopes('update:section')
	@Mutation(() => SectionObject)
	updateSection(
		@UniversityId() universityId: string,
		@Args('id') id: string,
		@Args('data') data: CreateSectionInput
	): Promise<SectionReturnType> {
		return this.sectionService.updateSection(universityId, id, data);
	}

	@Scopes('delete:section')
	@Mutation(() => SectionObject)
	deleteSection(
		@UniversityId() universityId: string,
		@Args('id') id: string
	): Promise<SectionReturnType> {
		return this.sectionService.deleteSection(universityId, id);
	}
}
