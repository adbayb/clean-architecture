import type { UseCaseInputBoundary } from "./use-case-input-boundary";
import type { UseCaseInputData } from "./use-case-input-data";

export type Controller<InputData extends UseCaseInputData = UseCaseInputData> = {
	execute: (input: InputData) => Promise<void>;
};

export type ControllerFactory<
	Output extends Controller<InputData>,
	InputData extends UseCaseInputData,
> = (useCase: UseCaseInputBoundary<InputData>) => Output;
