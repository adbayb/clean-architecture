import type { AnyRecord } from "./types";
import type { DataTransferObject } from "./DataTransferObject";

export type RequestModel<Input extends AnyRecord = AnyRecord> =
	DataTransferObject<Input>;
