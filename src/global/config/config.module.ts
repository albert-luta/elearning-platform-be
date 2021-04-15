import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true
		})
	],
	exports: [ConfigModule]
})
export class ConfigGlobalModule {}
