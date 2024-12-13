import type { AnyRecord } from "./types";
import type { Entity } from "./Entity";

export type EntityGateway<
	E extends Entity = Entity,
	Methods = AnyRecord,
> = Methods & {
	getMany: () => Promise<E[]>;
	getOne: (id: E["id"]) => Promise<E>;
};
