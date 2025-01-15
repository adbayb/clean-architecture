import type { Result } from "@open-vanilla/result";

import type { AnyInput } from "../core/AnyInput";
import type { Entity } from "./Entity";

export type EntityGatewayBoundary<E extends Entity = Entity> = {
	toEntity: (input: AnyInput) => Result<E>;
};
