import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';

@Module({
	providers: [SectionResolver, SectionService]
})
export class SectionModule {}
