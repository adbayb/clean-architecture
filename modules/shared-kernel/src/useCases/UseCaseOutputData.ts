type FailureInputConstraint = Error;

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends FailureInputConstraint = FailureInputConstraint,
> = (FailureInput | SuccessInput)[];
