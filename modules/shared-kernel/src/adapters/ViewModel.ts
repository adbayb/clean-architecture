import type { DataTransferObject } from "../DataTransferObject";

export type ViewModel<Input extends DataTransferObject = DataTransferObject> =
	DataTransferObject<Input>;
