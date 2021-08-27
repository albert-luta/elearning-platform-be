import { InputType, OmitType } from '@nestjs/graphql';
import { CreateUniversityUserInput } from './create-university-user.input';

@InputType()
export class UpdateUniversityUserInput extends OmitType(
	CreateUniversityUserInput,
	['userEmail'] as const
) {}
