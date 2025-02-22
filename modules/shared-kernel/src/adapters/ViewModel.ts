export type ViewModel<SuccessInput = unknown, FailureInput = unknown> = (
	| { payload: FailureInput; type: "failure" }
	| { payload: SuccessInput; type: "success" }
)[];
