import { Identifier } from "./Identifier";
import { Guard } from "./Guard";
import { DomainObject } from "./DomainObject";

export abstract class Entity extends DomainObject {
	public constructor(
		public id: Identifier = Identifier.create(crypto.randomUUID()),
	) {
		super();
	}

	public override equals(input: unknown) {
		if (this === input) return true;

		if (
			!(input instanceof Entity) ||
			Guard.mustBeDefinedAndNotNull(input).type === "failure"
		)
			return false;

		return this.id.equals(input.id);
	}
}
