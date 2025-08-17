import type { Result } from "./Result";
import { Guard } from "./Guard";
import type { AnyRecord } from "./AnyRecord";

/**
 * [Value Objects](https://en.wikipedia.org/wiki/Value_object) are immutable entities whose value is completely determined by their attributes.
 * They encapsulate data related to a specific concept, such as color, address, phone number, price, etc.
 * Immutability is the main characteristic of VOs, which means that their values never change once they are initialized.
 *
 * A value object has three main characteristics: no identity, immutability and self validation:
 * - No identity:
 * In contrast to an entity represented by a distinct identity through its whole lifespan, a value object has no conceptual identity but rather describe some characteristics of a thing.
 * A value object is defined by its attributes instead of an identifier and it can be thought of as a complex attribute of an entity.
 * Two value objects are equal if and only if all their attributes are equal (structural equality) in contrast to identifier and reference equality for entities.
 * - Immutability:
 * By its nature (a value object has no lifecycle), changing a value object attribute leads to the creation of a new instance instead of a mutation of the existing instance.
 * On the contrary, entities are almost always mutable.
 * - Self validation:
 * A Value Object must check for the consistency of its values.
 * Every formal validations must happen at value object construction time.
 */
export type ValueObject<Value = unknown> = {
	isEqualTo: (input: unknown) => input is ValueObject<Value>;
	value: Value;
};

export const createValueObjectFactory = <
	Output extends Result<ValueObject> | ValueObject,
	Input = unknown,
>(
	factory: (helpers: FactoryHelpers, input: Input) => Output,
) => {
	const helpers: FactoryHelpers = {
		isEqualTo(valueObject, value): value is typeof valueObject {
			if (valueObject === value) return true;

			if (Guard.mustBeDefinedAndNonNull(value).type === "failure")
				return false;

			return JSON.stringify(valueObject) === JSON.stringify(value);
		},
		isInstanceOf(value): value is ValueObject {
			if (Guard.mustBeRecord(value).type === "failure") return false;

			const castValue = value as AnyRecord;

			return "value" in castValue && "isEqualTo" in castValue; // Duck typing check
		},
	};

	return (input: Input) => {
		// Immutability is enforced by design via read-only type and mutation lock (Object.freeze).
		return Object.freeze(factory(helpers, input));
	};
};

type FactoryHelpers = {
	isEqualTo: <Value>(
		valueObject: ValueObject<Value>,
		value: unknown,
	) => value is typeof valueObject;
	isInstanceOf: (input: unknown) => input is ValueObject;
};
