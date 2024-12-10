import { isNullOrUndefined } from "./isNullOrUndefined";
import { Identifier } from "./Identifier";
import { DomainObject } from "./DomainObject";

export abstract class Entity<
	Id extends Identifier = Identifier,
> extends DomainObject {
	public id: Id;

	protected constructor(id?: Id) {
		super();
		this.id = id ?? (Identifier.create(crypto.randomUUID()) as Id);
	}

	public override equals(input: unknown) {
		if (isNullOrUndefined(input) || !(input instanceof Entity))
			return false;

		if (this === input) return true;

		return this.id.equals(input.id);
	}
}
