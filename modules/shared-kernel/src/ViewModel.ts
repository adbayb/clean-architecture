import type { AnyRecord } from "./types";
import type { DataTransferObject } from "./DataTransferObject";

export type ViewModel<Input extends AnyRecord = AnyRecord> =
	DataTransferObject<Input>;
