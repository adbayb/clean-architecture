import { createValueObjectFactory } from "../primitives";
import type { ValueObject } from "../primitives";

export type CreatedAtValueObject = ValueObject<Value>;

type Value = string;

export const createCreatedAtValueObject = createValueObjectFactory<CreatedAtValueObject>(
	(helpers) => {
		const valueObject: CreatedAtValueObject = {
			isEqualTo(value) {
				return helpers.isEqualTo(valueObject, value);
			},
			value: new Date().toISOString(),
		};

		return valueObject;
	},
);
