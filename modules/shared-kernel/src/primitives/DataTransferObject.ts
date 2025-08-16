export type DataTransferObject<SuccessInput, FailureInput> =
	| { payload: FailureInput; type: "failure" }
	| { payload: SuccessInput; type: "success" };
