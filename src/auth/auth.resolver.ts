import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { GraphQLRes } from 'src/my-graphql/decorators/graphql-res.decorator';
import { Authentication } from './dto/authentication.object';
import { GraphQLReq } from 'src/my-graphql/decorators/graphql-req.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { ReqType, ResType } from 'src/my-graphql/my-graphql.types';

@Public()
@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => Authentication)
	register(
		@Args('user') user: RegisterUserInput,
		@GraphQLRes() res: ResType
	) {
		return this.authService.register(user, res);
	}

	@Mutation(() => Authentication)
	login(@Args('user') user: LoginUserInput, @GraphQLRes() res: ResType) {
		return this.authService.login(user, res);
	}

	@Mutation(() => Authentication, { nullable: true })
	logout() {
		throw new UnauthorizedException('logout');
	}

	@Mutation(() => Authentication)
	refreshTokens(@GraphQLReq() req: ReqType, @GraphQLRes() res: ResType) {
		return this.authService.refreshTokens(req, res);
	}

	// TODO: Implement authentication and authorization(role based) guards
	@Query(() => String)
	testAuth() {
		return 'testAuth';
	}
}
