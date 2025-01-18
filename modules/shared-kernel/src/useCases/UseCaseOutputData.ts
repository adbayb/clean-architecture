import type { Result } from "../Result";

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends Error = Error,
> = Result<SuccessInput, FailureInput>;
