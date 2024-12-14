import { ValueObject } from "./ValueObject";
import { success } from "./Result";

type IdentifierValue = string;

/**
 * Identifier is a [value object](https://softwareengineering.stackexchange.com/a/372781) to enforce type safety.
 *
 * It prevents primitive obsession code smell introduction leading to weak type checking.
 * Indeed, for example, if a function takes both a ID and an Address, it is possible to pass them in the wrong order
 * if they are both strings but impossible if they are represented through a dedicated type)).
 */
export class Identifier extends ValueObject<IdentifierValue> {
	public static override create(input: IdentifierValue) {
		return success(new Identifier(input));
	}
}
