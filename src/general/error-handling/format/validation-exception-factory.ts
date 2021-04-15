import { ValidationError } from 'class-validator';
import { RequiredFields } from 'src/general/utils/types';
import { MyBadRequestException } from '../exceptions/my-bad-request.exception';

export const validationExceptionFactory = (errors: ValidationError[]) => {
	return new MyBadRequestException(
		errors
			.filter(
				(
					error
				): error is RequiredFields<ValidationError, 'constraints'> =>
					!!error.constraints
			)
			.reduce((acc, { property, constraints }) => {
				const error = Object.values(constraints)[0];
				const formattedError = [
					'This field',
					...error.split(' ').slice(1)
				].join(' ');

				return { ...acc, [property]: formattedError };
			}, {})
	);
};
