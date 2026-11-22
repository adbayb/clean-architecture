import type { DataTransferObject } from "./data-transfer-object";

export type ViewModel<
	SuccessInput = unknown,
	FailureInput extends FailureInputConstraint = FailureInputConstraint,
> = DataTransferObject<SuccessInput, FailureInput>;

type FailureInputConstraint = string;
