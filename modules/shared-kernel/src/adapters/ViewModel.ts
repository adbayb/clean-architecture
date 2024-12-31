import type { DataTransferObject } from "../core/DataTransferObject";

export type ViewModel<Input extends DataTransferObject = DataTransferObject> =
	DataTransferObject<Input>;
