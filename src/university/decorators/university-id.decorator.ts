import {
	createParamDecorator,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MyContext } from 'src/my-graphql/my-graphql.types';
import { UNIVERSITY_ID_HEADER_NAME } from '../university.constants';

export const UniversityId = createParamDecorator(
	(_: never, ctx: ExecutionContext) => {
		const universityId = GqlExecutionContext.create(
			ctx
		).getContext<MyContext>().req.headers[UNIVERSITY_ID_HEADER_NAME];
		if (universityId == null || Array.isArray(universityId)) {
			throw new ForbiddenException();
		}

		return universityId;
	}
);
