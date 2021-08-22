export const generateRandomInt = (min = 0, max = 100) => {
	const processedMin = Math.ceil(min);
	const processedMax = Math.floor(max);
	return Math.floor(
		Math.random() * (processedMax - processedMin) + processedMin
	);
};
