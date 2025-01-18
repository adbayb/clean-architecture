import {
	Guard,
	createValueObjectFactory,
	success,
} from "@clean-architecture/shared-kernel";
import type { Result, ValueObject } from "@clean-architecture/shared-kernel";

type Value = {
	fullName: string;
};

export type AuthorValueObject = ValueObject<Value>;

export const createAuthorValueObject = createValueObjectFactory<
	Result<AuthorValueObject>,
	Value
>((helpers, input) => {
	const failedGuard = Guard.against(
		Guard.mustBeNonEmptyString(input.fullName),
	);

	if (failedGuard) return failedGuard;

	const valueObject: AuthorValueObject = {
		isEqualTo(value) {
			return helpers.isEqualTo(valueObject, value);
		},
		value: input,
	};

	return success(valueObject);
});
