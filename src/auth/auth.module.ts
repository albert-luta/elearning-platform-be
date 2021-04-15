import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TokensService } from './services/tokens.service';

@Module({
	providers: [AuthResolver, AuthService, TokensService],
	exports: [TokensService]
})
export class AuthModule {}
