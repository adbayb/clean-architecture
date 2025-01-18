import { createValueObjectFactory } from "@clean-architecture/shared-kernel";
import type { ValueObject } from "@clean-architecture/shared-kernel";

type Value = string;

export type CreatedAtValueObject = ValueObject<Value>;

export const createCreatedAtValueObject =
	createValueObjectFactory<CreatedAtValueObject>((helpers) => {
		const valueObject: CreatedAtValueObject = {
			isEqualTo(value) {
				return helpers.isEqualTo(valueObject, value);
			},
			value: new Date().toISOString(),
		};

		return valueObject;
	});
