import { isNullOrUndefined } from "./isNullOrUndefined";
import { Identifier } from "./Identifier";
import { DomainObject } from "./DomainObject";

export abstract class Entity extends DomainObject {
	public constructor(
		public id: Identifier = Identifier.create(crypto.randomUUID()),
	) {
		super();
	}

	public override equals(input: unknown) {
		if (isNullOrUndefined(input) || !(input instanceof Entity))
			return false;

		if (this === input) return true;

		return this.id.equals(input.id);
	}
}
