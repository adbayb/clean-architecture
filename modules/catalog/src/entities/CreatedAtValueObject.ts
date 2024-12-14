import { ValueObject } from "@clean-architecture/shared-kernel";

type Value = string;

export class CreatedAtValueObject extends ValueObject<Value> {
	public static override create() {
		return new CreatedAtValueObject(new Date().toISOString());
	}
}
