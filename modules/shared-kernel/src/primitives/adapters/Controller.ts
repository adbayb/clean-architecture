import type { UseCaseInputData } from "../useCases/UseCaseInputData";
import type { UseCaseInputBoundary } from "../useCases/UseCaseInputBoundary";

export type Controller<InputData extends UseCaseInputData = UseCaseInputData> =
	{
		execute: (input: InputData) => Promise<void>;
	};

export type ControllerFactory<
	Output extends Controller<InputData>,
	InputData extends UseCaseInputData,
> = (useCase: UseCaseInputBoundary<InputData>) => Output;
