import type { Result } from "../Result";
import type { AnyInput } from "../AnyInput";
import type { Entity } from "./Entity";

export type EntityGatewayBoundary<
	Input extends {
		toEntity: (input: AnyInput) => Result<Entity>;
	} = {
		toEntity: (input: AnyInput) => Result<Entity>;
	},
> = Input;
