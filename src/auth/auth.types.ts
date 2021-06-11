type TokensPayloadUniversitiesScopes = Record<string, true>;
type TokensPayloadUniversities = Record<
	string,
	{
		scopes: TokensPayloadUniversitiesScopes;
	}
>;

export interface TokensPayload {
	user: {
		id: string;
		universities: TokensPayloadUniversities;
	};
}

export enum UserRole {
	ADMIN = 'ADMIN',
	TEACHER = 'TEACHER',
	STUDENT = 'STUDENT'
}
