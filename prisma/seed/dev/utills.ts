export type SeedDev<T> = Omit<T, 'universityId' | 'id'>;

export const expand = <A1, A2, R>(
	array1: A1[],
	array2: A2[],
	cb: (a1: A1, a2: A2) => R
) => {
	const res: R[] = [];
	array1.forEach((a1) => {
		array2.forEach((a2) => {
			res.push(cb(a1, a2));
		});
	});

	return res;
};
