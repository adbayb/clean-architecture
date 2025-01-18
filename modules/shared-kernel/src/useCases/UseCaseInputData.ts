import type { DataTransferObject } from "../DataTransferObject";

export type UseCaseInputData<
	Input extends DataTransferObject = DataTransferObject,
> = DataTransferObject<Input>;
