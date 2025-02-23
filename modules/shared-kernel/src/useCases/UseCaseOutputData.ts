import type { DataTransferObject } from "../DataTransferObject";

type FailureInputConstraint = Error;

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends FailureInputConstraint = FailureInputConstraint,
> = DataTransferObject<SuccessInput, FailureInput>;
