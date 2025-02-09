type UseCaseOutputDataFailureConstraint = Error | Error[];

export type UseCaseOutputData<
	SuccessInput = unknown,
	FailureInput extends UseCaseOutputDataFailureConstraint = Error,
> = FailureInput | SuccessInput;

export type GetUseCaseOutputDataSuccessType<
	OutputData extends UseCaseOutputData,
> = Exclude<OutputData, UseCaseOutputDataFailureConstraint>;

export type GetUseCaseOutputDataFailureType<
	OutputData extends UseCaseOutputData,
> = Extract<OutputData, UseCaseOutputDataFailureConstraint>;
