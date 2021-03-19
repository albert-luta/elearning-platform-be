import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JustForQueryService } from './just-for-query.service';
import { JustForQuery } from './entities/just-for-query.entity';
import { CreateJustForQueryInput } from './dto/create-just-for-query.input';
import { UpdateJustForQueryInput } from './dto/update-just-for-query.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => JustForQuery)
export class JustForQueryResolver {
	constructor(
		private readonly justForQueryService: JustForQueryService,
		private prisma: PrismaService
	) {}

	@Mutation(() => JustForQuery)
	createJustForQuery(
		@Args('createJustForQueryInput')
		createJustForQueryInput: CreateJustForQueryInput
	) {
		return this.justForQueryService.create(createJustForQueryInput);
	}

	@Query(() => [JustForQuery], { name: 'justForQuery' })
	findAll() {
		console.log(this.prisma);
		return this.justForQueryService.findAll();
	}

	@Query(() => JustForQuery, { name: 'justForQuery' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.justForQueryService.findOne(id);
	}

	@Mutation(() => JustForQuery)
	updateJustForQuery(
		@Args('updateJustForQueryInput')
		updateJustForQueryInput: UpdateJustForQueryInput
	) {
		return this.justForQueryService.update(
			updateJustForQueryInput.id,
			updateJustForQueryInput
		);
	}

	@Mutation(() => JustForQuery)
	removeJustForQuery(@Args('id', { type: () => Int }) id: number) {
		return this.justForQueryService.remove(id);
	}
}
