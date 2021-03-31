import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import {
	GraphQLRes,
	GraphQLResType
} from 'src/decorators/GraphQLRes.decorator';
import { Authentication } from './dto/authentication.object';
import {
	GraphQLReq,
	GraphQLReqType
} from 'src/decorators/GraphQLReq.decorator';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => Authentication)
	register(
		@Args('user') user: RegisterUserInput,
		@GraphQLRes() res: GraphQLResType
	) {
		return this.authService.register(user, res);
	}

	@Mutation(() => Authentication)
	login(
		@Args('user') user: LoginUserInput,
		@GraphQLRes() res: GraphQLResType
	) {
		return this.authService.login(user, res);
	}

	@Mutation(() => Authentication, { nullable: true })
	logout() {
		throw new UnauthorizedException('logout');
	}

	@Mutation(() => Authentication)
	refreshTokens(
		@GraphQLReq() req: GraphQLReqType,
		@GraphQLRes() res: GraphQLResType
	) {
		return this.authService.refreshTokens(req, res);
	}

	// TODO: Implement authentication and authorization(role based) guards
	@Query(() => String)
	testAuth() {
		return 'testAuth';
	}
}
