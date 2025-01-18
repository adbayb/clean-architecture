import type { Result } from "../Result";
import { Guard } from "../Guard";
import type { AnyRecord } from "../AnyRecord";
import type { IdValueObject } from "./IdValueObject";

export type Entity<Input = AnyRecord> = Input & {
	id: IdValueObject;
	isEqualTo: (input: unknown) => input is Entity<Input>;
};

export const createEntityFactory = <Output extends Entity, Input = unknown>(
	factory: (helpers: FactoryHelpers, input: Input) => Result<Output>,
) => {
	const helpers: FactoryHelpers = {
		isEqualTo(entity, value): value is typeof entity {
			if (entity === value) return true;

			if (!helpers.isInstanceOf(value)) return false;

			return entity.id === value.id;
		},
		isInstanceOf(input): input is Entity {
			if (Guard.mustBeRecord(input).type === "failure") return false;

			const value = input as AnyRecord;

			return "id" in value && "isEqualTo" in value; // Duck typing check
		},
	};

	return (input: Input) => {
		return factory(helpers, input);
	};
};

type FactoryHelpers = {
	isEqualTo: <Input>(
		entity: Entity<Input>,
		value: unknown,
	) => value is typeof entity;
	isInstanceOf: (input: unknown) => input is Entity;
};
