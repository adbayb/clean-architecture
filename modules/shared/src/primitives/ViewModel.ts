import type { DataTransferObject } from "./DataTransferObject";

type FailureInputConstraint = string;

export type ViewModel<
	SuccessInput = unknown,
	FailureInput extends FailureInputConstraint = FailureInputConstraint,
> = DataTransferObject<SuccessInput, FailureInput>;
