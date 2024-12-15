import type { Result } from "@open-vanilla/result";

import { IdValueObject } from "./IdValueObject";
import { Guard } from "./Guard";
import type { DomainObject } from "./DomainObject";

export abstract class Entity implements DomainObject {
	protected constructor(
		public id: IdValueObject = IdValueObject.create(crypto.randomUUID()),
	) {}

	public static create(..._: unknown[]): Entity | Result<Entity> {
		throw new Error("NotImplementedException");
	}

	public equals(input: unknown) {
		if (this === input) return true;

		if (
			!(input instanceof Entity) ||
			Guard.mustBeDefinedAndNonNull(input).type === "failure"
		)
			return false;

		return this.id.equals(input.id);
	}
}
