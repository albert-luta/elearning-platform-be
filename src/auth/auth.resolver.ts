import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { User } from './dto/user.object';
import { MySession, MySessionType } from 'src/decorators/MySession.decorator';

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => User)
	register(@Args('user') user: RegisterUserInput) {
		return this.authService.register(user);
	}

	@Mutation(() => User)
	login(
		@Args('user') user: LoginUserInput,
		@MySession() session: MySessionType
	) {
		return this.authService.login(user, session);
	}

	@Query(() => String)
	me() {
		return 'me';
	}
}
