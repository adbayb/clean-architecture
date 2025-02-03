import {
	Guard,
	createValueObjectFactory,
	success,
} from "@clean-architecture/shared-kernel";
import type { Result, ValueObject } from "@clean-architecture/shared-kernel";

type Value = number;

export type PriceValueObject = ValueObject<Value>;

export const createPriceValueObject = createValueObjectFactory<
	Result<PriceValueObject>,
	Value
>((helpers, input) => {
	const failedGuard = Guard.against(Guard.mustBePositiveInteger(input));

	if (failedGuard) return failedGuard;

	const valueObject: PriceValueObject = {
		isEqualTo(value) {
			return helpers.isEqualTo(valueObject, value);
		},
		value: input,
	};

	return success(valueObject);
});
