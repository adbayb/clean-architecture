import { ValueObject } from "./ValueObject";

type Value = string;

/**
 * IdValueObject is a [value object](https://softwareengineering.stackexchange.com/a/372781) to enforce type safety.
 *
 * It prevents primitive obsession code smell introduction leading to weak type checking.
 * Indeed, for example, if a function takes both a ID and an Address, it is possible to pass them in the wrong order
 * if they are both strings but impossible if they are represented through a dedicated type)).
 */
export class IdValueObject extends ValueObject<Value> {
	public static override create(input: Value) {
		return new IdValueObject(input);
	}
}
