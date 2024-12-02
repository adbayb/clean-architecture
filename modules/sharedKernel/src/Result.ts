type ResultType = "failure" | "success";

/**
 * TypeScript implementation for the Result pattern inspired by the [Rust primitive](https://doc.rust-lang.org/std/result/).
 * The Result pattern is also known as [Either pattern](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions) in other programming languages (functional ones).
 *
 * In contrast to traditional exception handling, the Result pattern:
 * - Makes the control flow and error handling more explicit (the developer has to handle both scenarios (failure and success)).
 * - Add less performance overhead as returning a value is generally faster than [throwing an exception](https://dev.to/ephilips/better-error-handling-in-c-with-result-types-4aan).
 */
export class Result<
	SuccessValue,
	FailureValue,
	Type extends ResultType = ResultType,
> {
	public type: Type;

	public value: FailureValue | SuccessValue;

	private constructor(type: ResultType, value: FailureValue | SuccessValue) {
		this.type = type as typeof this.type;
		this.value = value;
	}

	public static success<Input>(input: Input) {
		return new Result("success", input) as Result<Input, never, "success">;
	}

	public static failure<Input>(input: Input) {
		return new Result("failure", input) as Result<never, Input, "failure">;
	}

	public unwrap() {
		if (this.type === "failure") {
			throw this.value instanceof Error
				? this.value
				: new Error(
						typeof this.value === "string"
							? this.value
							: JSON.stringify(this.value),
					);
		}

		return this.value as SuccessValue;
	}

	public match<FailureOutput, SuccessOutput>(input: {
		failure: (
			input: Pick<
				Result<never, FailureValue, "failure">,
				"type" | "value"
			>,
		) => FailureOutput;
		success: (
			input: Pick<
				Result<SuccessValue, never, "success">,
				"type" | "value"
			>,
		) => SuccessOutput;
	}) {
		return this.type === "failure"
			? input.failure({
					type: this.type,
					value: this.value as FailureValue,
				})
			: input.success({
					type: this.type,
					value: this.value as SuccessValue,
				});
	}
}
