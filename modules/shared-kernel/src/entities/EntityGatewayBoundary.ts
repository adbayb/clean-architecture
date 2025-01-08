import type { Result } from "@open-vanilla/result";

import type { DataTransferObject } from "../core/DataTransferObject";
import type { GetValueFromValueObject } from "./ValueObject";
import type { Entity } from "./Entity";

export type EntityGatewayBoundary<
	E extends Entity = Entity,
	Methods = DataTransferObject,
> = Methods & {
	getMany: () => Promise<Result<E[]>>;
	getOne: (
		id: GetValueFromValueObject<E["attributes"]["id"]>,
	) => Promise<Result<E>>;
};
