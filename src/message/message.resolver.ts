import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class MessageResolver {
	@Query(() => String)
	message() {
		return 'Just a test message';
	}
}
