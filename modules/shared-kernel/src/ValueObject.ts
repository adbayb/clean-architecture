import type { Result } from "@open-vanilla/result";

import { Guard } from "./Guard";
import type { DomainObject } from "./DomainObject";

/**
 * [Value Objects](https://en.wikipedia.org/wiki/Value_object) are immutable entities whose value is completely determined by their attributes.
 * They encapsulate data related to a specific concept, such as color, address, phone number, price, etc.
 * Immutability is the main characteristic of VOs, which means that their values never change once they are initialized.
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
export abstract class ValueObject<Value> implements DomainObject {
	public readonly value: Value;

	public static create(
		..._: unknown[]
	): Result<ValueObject<unknown>> | ValueObject<unknown> {
		throw new Error("NotImplementedException");
	}

	protected constructor(input: Value) {
		this.value = Object.freeze(input); // Immutability is enforced via read-only type and mutation lock (Object.freeze).
	}

	public equals(input: unknown) {
		if (this === input) return true;

		if (Guard.mustBeDefinedAndNotNull(input).type === "failure")
			return false;

		return JSON.stringify(this) === JSON.stringify(input);
	}
}
