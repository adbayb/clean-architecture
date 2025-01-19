export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends Error = Error,
> = FailureInput | SuccessInput;
