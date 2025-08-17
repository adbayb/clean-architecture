import type { UseCaseInputData } from "./UseCaseInputData";
import type { UseCaseInputBoundary } from "./UseCaseInputBoundary";

export type Controller<InputData extends UseCaseInputData = UseCaseInputData> =
	{
		execute: (input: InputData) => Promise<void>;
	};

export type ControllerFactory<
	Output extends Controller<InputData>,
	InputData extends UseCaseInputData,
> = (useCase: UseCaseInputBoundary<InputData>) => Output;
