import { Guard, ValueObject, success } from "@clean-architecture/shared-kernel";

type Value = {
	fullName: string;
};

export class AuthorValueObject extends ValueObject<Value> {
	public static override create(input: Value) {
		const failedGuard = Guard.against(
			Guard.mustBeNonEmptyString(input.fullName),
		);

		if (failedGuard) return failedGuard;

		return success(new AuthorValueObject(input));
	}
}
