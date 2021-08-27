import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CollegeToEnrollAtInput } from './college-to-enroll-at.input';

@InputType()
export class CreateUniversityUserInput {
	@Field()
	@IsNotEmpty()
	@IsEmail()
	userEmail: string;

	@Field()
	@IsNotEmpty()
	roleId: string;

	@Field(() => [CollegeToEnrollAtInput])
	collegesToEnrollAt: CollegeToEnrollAtInput[];
}
