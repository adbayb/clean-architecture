import type { Result } from "@open-vanilla/result";

import type { GetValueFromValueObject } from "./ValueObject";
import type { IdValueObject } from "./IdValueObject";
import { Guard } from "./Guard";
import type { DomainObject } from "./DomainObject";

type EntityAttributes = { id: IdValueObject };

export abstract class Entity<
	Attributes extends EntityAttributes = EntityAttributes,
> implements DomainObject
{
	protected constructor(public attributes: Attributes) {}

	public static create(_input: {
		id: GetValueFromValueObject<EntityAttributes["id"]>;
	}): Entity | Result<Entity> {
		throw new Error("NotImplementedException");
	}

	public static isInstanceOf(input: unknown): input is Entity {
		return input instanceof Entity;
	}

	public equals(input: unknown) {
		if (this === input) return true;

		if (
			!Entity.isInstanceOf(input) ||
			Guard.mustBeDefinedAndNonNull(input).type === "failure"
		)
			return false;

		return this.attributes.id.equals(input.attributes.id);
	}
}
