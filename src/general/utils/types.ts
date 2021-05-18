/**
 * Pick what fields to become required
 */
export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

/**
 * Recursively adds null to any optional field
 */
export type PrismaNullable<T extends Record<string, any>> = {
	[K in keyof T]: undefined extends T[K]
		? Required<T>[K] extends Record<string, any>
			? PrismaNullable<Required<T>[K]> | null
			: T[K] | null
		: T[K] extends Record<string, any>
		? PrismaNullable<T[K]>
		: T[K];
};
