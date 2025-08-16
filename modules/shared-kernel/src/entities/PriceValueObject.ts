import { Guard, createValueObjectFactory, success } from "../primitives";
import type { Result, ValueObject } from "../primitives";

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
