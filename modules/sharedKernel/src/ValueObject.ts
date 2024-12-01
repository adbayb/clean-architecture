import type { AnyRecord } from "./types";

/**
 * A value object abstract class to inherit value object behavior.
 *
 * A value object has three main characteristics: no identity, immutability and self validation:
 * - No identity:
 * In contrast to an entity represented by a distinct identity through its whole lifespan, a value object has no conceptual identity but rather describe some characteristics of a thing.
 * A value object is defined by its attributes instead of an identifier and it can be thought of as a complex attribute of an entity.
 * Two value objects are equal if and only if all there attributes are equal (structural equality) in contrast to identifier equality for entities.
 * - Immutability:
 * By its nature (a value object has no lifecycle), changing a value object attribute leads to the creation of a new instance instead of a mutation of the existing instance.
 * On the contrary, entities are almost always mutable.
 * - Self validation:
 * A Value Object must check for the consistency of its values.
 * Every formal validations must happen at value object construction time.
 */
export const ValueObject = {
	create<Value extends AnyRecord>(
		input: Value,
		isValid: (input: Value) => boolean,
	): { equals: (input: AnyRecord) => boolean; value: Value | null } {
		const value = isValid(input) ? input : null;

		return {
			equals(equalsInput) {
				return JSON.stringify(equalsInput) === JSON.stringify(value);
			},
			value,
		};
	},
};
