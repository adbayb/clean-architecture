import type { DataTransferObject } from "./data-transfer-object";

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends FailureInputConstraint = FailureInputConstraint,
> = DataTransferObject<SuccessInput, FailureInput>;

type FailureInputConstraint = Error;
