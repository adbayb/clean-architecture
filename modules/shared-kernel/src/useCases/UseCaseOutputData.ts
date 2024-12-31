import type { Result } from "@open-vanilla/result";

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends Error = Error,
> = Result<SuccessInput, FailureInput>;
