import type { UseCaseInputData } from "./use-case-input-data";

export type UseCaseInputBoundary<InputData extends UseCaseInputData> = {
	execute: (input: InputData) => Promise<void>;
};
