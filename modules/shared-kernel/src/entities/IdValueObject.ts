import { createValueObjectFactory } from "../primitives";
import type { ValueObject } from "../primitives";

type Value = string;

/**
 * IdValueObject is a [value object](https://softwareengineering.stackexchange.com/a/372781) to enforce type safety.
 *
 * It prevents primitive obsession code smell introduction leading to weak type checking.
 * Indeed, for example, if a function takes both a ID and an Address, it is possible to pass them in the wrong order
 * if they are both strings but impossible if they are represented through a dedicated type)).
 */
export type IdValueObject = ValueObject<Value>;

export const createIdValueObject = createValueObjectFactory<
	IdValueObject,
	Value | undefined
>((helpers, input) => {
	const valueObject: IdValueObject = {
		isEqualTo(value) {
			return helpers.isEqualTo(valueObject, value);
		},
		value: input ?? crypto.randomUUID(),
	};

	return valueObject;
});
