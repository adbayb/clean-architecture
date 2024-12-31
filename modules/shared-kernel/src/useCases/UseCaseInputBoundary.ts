import type { UseCaseInputData } from "./UseCaseInputData";

export type UseCaseInputBoundary<InputData extends UseCaseInputData> = {
	execute: (input: InputData) => Promise<void> | void;
};
