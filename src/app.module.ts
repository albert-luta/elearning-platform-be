import { Module } from '@nestjs/common';
import { PrismaGlobalModule } from './global/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './general/error-handling/filters/all-exceptions.filter';
import { UserModule } from './user/user.module';
import { JwtGlobalModule } from './global/jwt/jwt.module';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { CompanyModule } from './company/company.module';
import { ConfigGlobalModule } from './global/config/config.module';
import { MyGraphQLModule } from './my-graphql/my-graphql.module';

@Module({
	imports: [
		MyGraphQLModule,
		ConfigGlobalModule,
		PrismaGlobalModule,
		JwtGlobalModule,
		AuthModule,
		UserModule,
		CompanyModule
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter
		},
		{
			provide: APP_GUARD,
			useClass: AuthenticationGuard
		}
	]
})
export class AppModule {}
