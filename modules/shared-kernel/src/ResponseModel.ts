import type { Result } from "@open-vanilla/result";

export type ResponseModel<
	SuccessInput,
	FailureInput extends Error = Error,
> = Result<SuccessInput, FailureInput>;
