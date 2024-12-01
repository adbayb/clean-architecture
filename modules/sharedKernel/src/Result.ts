/* eslint-disable sonarjs/different-types-comparison, @typescript-eslint/prefer-nullish-coalescing */

import type { NonUndefined } from "./types";

type ErrorValueConstraint = string | undefined;

export class Result<SuccessValue, ErrorValue extends ErrorValueConstraint> {
	public type: ErrorValue extends undefined ? "success" : "failure";

	public value: typeof this.type extends "failure"
		? NonUndefined<ErrorValue>
		: NonUndefined<SuccessValue>;

	private constructor(successInput: SuccessValue, errorInput: ErrorValue) {
		if (successInput === undefined && errorInput === undefined) {
			throw new TypeError(
				"A result must be either successful or erroneous",
			);
		}

		if (successInput && errorInput) {
			throw new TypeError(
				"A result cannot be successful and erroneous at the same time",
			);
		}

		this.type = (
			errorInput === undefined ? "success" : "failure"
		) as typeof this.type;

		this.value = (
			errorInput === undefined ? successInput : errorInput
		) as typeof this.value;
	}

	public static failure<Input extends NonUndefined<ErrorValueConstraint>>(
		input: Input,
	) {
		return new Result(undefined, input);
	}

	public static success<Input>(input: Input) {
		return new Result(input, undefined);
	}

	public unwrap() {
		if (this.type === "failure") {
			throw new Error(this.value as NonUndefined<ErrorValue>);
		}

		return this.value as NonUndefined<SuccessValue>;
	}

	public match<FailureOutput, SuccessOutput>(input: {
		failure: (
			input: Pick<
				Result<undefined, NonUndefined<ErrorValue>>,
				"type" | "value"
			>,
		) => FailureOutput;
		success: (
			input: Pick<
				Result<NonUndefined<SuccessValue>, undefined>,
				"type" | "value"
			>,
		) => SuccessOutput;
	}): FailureOutput | SuccessOutput {
		return this.type === "failure"
			? input.failure({
					type: this.type,
					value: this.value as Result<
						undefined,
						NonUndefined<ErrorValue>
					>["value"],
				})
			: input.success({
					type: this.type,
					value: this.value as Result<
						NonUndefined<SuccessValue>,
						undefined
					>["value"],
				});
	}
}
