export type RequiredFields<T, K extends keyof T> = Exclude<T, K> &
	Required<Pick<T, K>>;
