import { failure, success } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

/**
 * A record exposing guard clauses.
 * A guard clause is an pre-condition check used to avoid errors during execution.
 * It allows immediately exiting the function if it is not fulfilled, either with a return statement or an exception.
 * @see https://deviq.com/design-patterns/guard-clause
 */
export const Guard = {
	against<Results extends Result<unknown>[]>(...results: Results) {
		return results.find((guard) => {
			return guard.type === "failure";
		});
	},
	mustBeDefinedAndNonNull<Input>(input: Input) {
		if (input === null || input === undefined) {
			return failure(
				new TypeError(
					`\`${String(input)}\` must be defined and non null`,
				),
			);
		}

		return success(input);
	},
	mustBeLessThanCharacters(input: string, length: number) {
		if (input.length >= length) {
			return failure(
				new TypeError(
					`\`${input}\` must be less than ${length} characters`,
				),
			);
		}

		return success(input);
	},
	mustBeNonEmptyString(input: string) {
		if (input.length === 0) {
			return failure(new TypeError(`\`${input}\` must be non empty`));
		}

		return success(input);
	},
};
