import { Guard, ValueObject, success } from "@clean-architecture/shared-kernel";

type Value = {
	firstName: string;
	lastName: string;
};

export class AuthorValueObject extends ValueObject<Value> {
	public static override create(input: Value) {
		const failedGuard = Guard.against(
			Guard.mustBeNonEmptyString(input.firstName),
			Guard.mustBeNonEmptyString(input.lastName),
		);

		if (failedGuard) return failedGuard;

		return success(new AuthorValueObject(input));
	}
}
