import type { DataTransferObject } from "../core/DataTransferObject";

export type UseCaseInputData<
	Input extends DataTransferObject = DataTransferObject,
> = DataTransferObject<Input>;
