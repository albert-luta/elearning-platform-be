import { Module } from '@nestjs/common';
import { JustForQueryService } from './just-for-query.service';
import { JustForQueryResolver } from './just-for-query.resolver';

@Module({
	providers: [JustForQueryResolver, JustForQueryService]
})
export class JustForQueryModule {}
