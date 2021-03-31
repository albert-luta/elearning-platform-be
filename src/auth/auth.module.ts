import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
	imports: [JwtModule.register({})],
	providers: [AuthResolver, AuthService, TokensService],
	exports: [TokensService]
})
export class AuthModule {}
