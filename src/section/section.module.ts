import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
	providers: [SectionResolver, SectionService],
	imports: [ActivityModule]
})
export class SectionModule {}
