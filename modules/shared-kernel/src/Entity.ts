import { unwrap } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

import { Identifier } from "./Identifier";
import { Guard } from "./Guard";
import type { DomainObject } from "./DomainObject";

export abstract class Entity implements DomainObject {
	protected constructor(
		public id: Identifier = unwrap(Identifier.create(crypto.randomUUID())),
	) {}

	public static create(..._: unknown[]): Result<unknown> {
		throw new Error("NotImplementedException");
	}

	public equals(input: unknown) {
		if (this === input) return true;

		if (
			!(input instanceof Entity) ||
			Guard.mustBeDefinedAndNotNull(input).type === "failure"
		)
			return false;

		return this.id.equals(input.id);
	}
}
