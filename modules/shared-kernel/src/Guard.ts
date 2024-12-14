import { failure, success } from "@open-vanilla/result";

/**
 * A record exposing guard clauses.
 * A guard clause is an pre-condition check used to avoid errors during execution.
 * It allows immediately exiting the function if it is not fulfilled, either with a return statement or an exception.
 * @see https://deviq.com/design-patterns/guard-clause
 */
export const Guard = {
	mustBeDefinedAndNotNull<Input>(input: Input) {
		if (input === null || input === undefined) {
			return failure(
				new TypeError(
					`\`${String(input)}\` must be defined and not null`,
				),
			);
		}

		return success(input);
	},
	mustBeLessThanCharacters<Input extends string>(
		input: Input,
		length: number,
	) {
		if (input.length >= length) {
			return failure(
				new TypeError(
					`\`${String(input)}\` must be less than ${length} characters`,
				),
			);
		}

		return success(input);
	},
};
