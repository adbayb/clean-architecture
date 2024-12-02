import { describe, expect, test } from "vitest";

import { Result } from "./Result";

// eslint-disable-next-line vitest/prefer-lowercase-title
describe("Result", () => {
	test("should create successful value", () => {
		const output = Result.success("Successful");

		expect(output.type).toBe("success");
		expect(output.value).toBe("Successful");
	});

	test("should create failure value", () => {
		const output: Result<"Success", "Failure"> = Result.failure("Failure");

		expect(output.type).toBe("failure");
		expect(output.value).toBe("Failure");
	});

	test("should unwrap value", () => {
		const output = Result.success("Successful").unwrap();

		expect(output).toBe("Successful");

		expect(() => {
			Result.failure("Failure").unwrap();
		}).toThrow("Failure");
	});

	test("should match value", () => {
		const matcher = (result: Result<unknown, unknown>) => {
			return result.match({
				failure(input) {
					return input;
				},
				success(input) {
					return input;
				},
			});
		};

		expect(matcher(Result.success("Successful"))).toStrictEqual({
			type: "success",
			value: "Successful",
		});
		expect(matcher(Result.failure("Failure"))).toStrictEqual({
			type: "failure",
			value: "Failure",
		});
	});

	test("should type check", () => {
		Result.success("Successful") satisfies Result<"Successful", "Failure">;
		Result.failure("Failure") satisfies Result<"Successful", "Failure">;
		Result.success("Successful") satisfies Result<"Successful", never>;
		Result.failure("Failure") satisfies Result<never, "Failure">;
		// @ts-expect-error Mismatched type value
		Result.success("Successful") satisfies Result<"Other", never>;
		// @ts-expect-error Mismatched type value
		Result.failure("Failure") satisfies Result<never, "Other">;

		expect(true).toBe(true);
	});
});
