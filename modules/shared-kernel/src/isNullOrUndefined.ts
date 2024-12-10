export const isNullOrUndefined = (
	input: unknown,
): input is null | undefined => {
	return input === null || input === undefined;
};
