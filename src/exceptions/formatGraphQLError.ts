import { GraphQLError } from 'graphql';

export const formatGraphQLError = (error: GraphQLError) => {
	return error.extensions?.exception?.response ?? error;
};
