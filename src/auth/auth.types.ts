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
	ADMIN_UNIVERSITY = 'ADMIN_UNIVERSITY',
	ADMIN_COLLEGE = 'ADMIN_COLLEGE',
	TEACHER = 'TEACHER',
	STUDENT = 'STUDENT'
}
